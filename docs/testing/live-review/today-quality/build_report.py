"""Build the quality handoff from saved runtime captures, without model calls."""
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
OUT = Path(__file__).resolve().parent
RUNS = OUT.parent / 'runs'
EVIDENCE = ROOT / 'docs/coordination/evidence'


def resolve_run(log):
    text = (EVIDENCE / log).read_text(encoding='utf-8-sig')
    matches = re.findall(r'runs[\\/]([0-9TZ-]+)[\\/]RECAP.md', text)
    if not matches:
        raise RuntimeError(f'No completed run in {log}')
    return matches[-1]


def capture(run, profile, stage):
    return json.loads((RUNS / run / profile / (stage + '.json')).read_text(encoding='utf-8-sig'))


def link(run, profile, stage):
    return f'../runs/{run}/{profile}/{stage}.md'


def profile_report(run, profile, label):
    checked = capture(run, profile, 'checker')['output']
    decision = capture(run, profile, 'decision-engine')['output']
    rows = checked['primary']
    result = [f'# {label}', '', f'Actual run: `{run}`. Model: Gemini 3.5 Flash Lite.', '',
              f"Today: **{decision.get('title') or decision.get('clarificationQuestion') or 'No card'}**.",
              f"Decision: `{decision['decisionStatus']}`. Action: `{decision.get('selectedActionId')}`. Score: `{decision.get('score')}`.", '',
              f"Catalog requested: `{checked.get('fallbackTriggered')}`. Critical coverage: `{checked.get('criticalCoverageAddedIds')}`.", '',
              f'[Exact generator input and raw output]({link(run, profile, "suggestion-generator")}) · '
              f'[Checker and per-proposal evidence]({link(run, profile, "checker")}) · '
              f'[Decision trace]({link(run, profile, "decision-engine")})', '']
    for row in rows:
        result += [f"## {row['id']} — {row['title']}", '',
                   f"Intent: `{row.get('intent')}`. Verdict: **{row['status']}**. Origin: `{row['origin']}`.", '',
                   row['description'], '', f"Rationale: {row['rationale']}", '',
                   f"Checker: {row['reason']}", '',
                   f"Usefulness: `{row.get('usefulness')}` — {row.get('usefulnessReason')}", '',
                   f"PI: `{row.get('factIds')}`. Claims: `{row.get('claimIds')}`.",
                   f"Missing information: `{row.get('missingInfo')}`.", '']
    result += ['## Evidence files', '']
    for f in sorted((RUNS / run / profile).glob('*.md')):
        result.append(f'- [{f.stem}]({link(run, profile, f.stem)})')
    failures = []
    for f in sorted((RUNS / run / profile).glob('*.json')):
        for call in json.loads(f.read_text(encoding='utf-8-sig')).get('calls', []):
            response = call['response']
            if not response.get('liveCallUsed'):
                failures.append(f"- {f.stem}: {response.get('fallbackReason', 'Unavailable reason')}; used by runtime: {call.get('usedByRuntime')}.")
    result += ['', '## Provider failures and retries', '', *(failures or ['None recorded.']), '']
    (OUT / (label.lower().replace(' ', '-') + '.md')).write_text('\n'.join(result), encoding='utf8')
    return rows, decision


def main():
    baseline = resolve_run('today-quality-acceptance-baseline.txt')
    baseline_runs = {}
    recap = ['# Today recommendation quality — actual acceptance results', '',
             'Only pinned Gemini 3.5 Flash Lite was used. Original profiles and historical results are preserved. '
             'Safety verdicts and usefulness are reported separately. Provider failures are not counted as successful model outputs.', '',
             '[Previous nine outputs](../primary-grounding/CHECKER-LIVE-RESULTS.md) · '
             '[Seven-stage implementation](SEVEN-STAGES.md) · [Updated assessment](ASSESSMENT.md) · [Actual EUR 500 formula example](CALCULATION-EXAMPLE.md) · [Formula guide](../FORMULAS.md)', '']
    for profile in ['debt', 'strong', 'nora']:
        run = resolve_run('today-quality-acceptance-strong.txt') if profile == 'strong' else baseline
        baseline_runs[profile] = run
        rows, decision = profile_report(run, profile, profile)
        counts = Counter(row['status'] for row in rows)
        model_count = sum(row['origin'] == 'MODEL' for row in rows)
        recap += [f'## {profile.title()}', '',
                  f"{model_count} model-origin slots. Verdicts: {dict(counts)}.",
                  f"Today: **{decision.get('title') or decision.get('clarificationQuestion') or 'No card'}**; `{decision['decisionStatus']}`.",
                  f'[Three proposals, statuses and all stage files]({profile}.md)', '']
    recap += ['## Paired synthetic profiles', '',
              'Expected outcomes were recorded before acceptance in [VARIANT-EXPECTATIONS.md](../../../../user-inputs/synthetic/backend-review/VARIANT-EXPECTATIONS.md). '
              'EUR 500 and the EUR 400 adjustment are explicit synthetic user choices, not new policy thresholds.', '']
    for variant, profile in [('debt-funded', 'debt'), ('debt-us', 'debt'), ('strong-confirmed', 'strong'),
                             ('strong-missing-fx', 'strong'), ('nora-fresh', 'nora')]:
        log = f'today-quality-final-{variant}-retry.txt' if variant in ['strong-confirmed', 'strong-missing-fx'] else f'today-quality-final-{variant}.txt'
        run = resolve_run(log)
        rows, decision = profile_report(run, profile, variant)
        recap += [f"- **{variant}:** {decision.get('title') or decision.get('clarificationQuestion') or 'No card'}; "
                  f"`{decision['decisionStatus']}`; score `{decision.get('score')}`. [Actual inputs, outputs and checks]({variant}.md)."]
    recap += ['', '## Verification and limits', '',
              '- Server: 314 passing tests, including the 14 mandatory E2E scenarios; typecheck passed.',
              '- Web production build and mobile TypeScript check passed. No browser/device interaction is claimed.',
              '- The baseline comparison changes orchestration, prompts and context enrichment; it is not a frozen-request prompt-only experiment.',
              '- Financial dates remain frozen at the fixture reference date. Actual model requests retain real execution timestamps.',
              '- Non-executing steps and clarifications have no invented financial score. A005 critical priority bypasses F017.',
              '- Synthetic databases are temporary encrypted SQLite; captures retain actual readback evidence. No production data or real money was changed.',
              '- Model usefulness remains variable. A successful critical/catalog selection is not proof that the primary generator solved the case.', '']
    recap += ['## Post-capture source-display correction', '',
              'The final inspection found that the explanation formatter inserted S001 when the actual decision had no source. '
              'This presentation defect was removed and regression-tested. The live selection and amounts did not change. '
              'Original captures remain untouched; actual deterministic replays show the corrected text: '
              '[EU Debt](../runs/2026-11-08T21-22-35-462Z/debt/explanation.md) and '
              '[confirmed Strong](../runs/2026-11-08T21-22-54-857Z/strong/explanation.md). '
              'No additional live model call is claimed for these replays.', '',
              'The confirmed Strong score used explicitly labelled catalog complexity factors because the AI factor batch was incomplete. '
              'See the formula example for the actual UNKNOWN factors and calculation.', '']
    recap += ['## Interrupted attempts retained separately', '',
              '- The first acceptance batch did not reach Strong generation because its initial Assistant request returned HTTP 504. Strong was rerun separately; its report uses the completed retry.',
              '- The first confirmed-Strong attempt timed out during review and exposed an asynchronous temporary-database shutdown race. The runner now waits for running job writes before closing SQLite and records an initial Assistant failure without aborting the financial evaluation.',
              '- Intermediate missing-FX captures blocked money correctly but showed a reserve question instead of the blocking FX field. The final retry follows the corrected deterministic clarification priority.',
              '- These interrupted and intermediate attempts remain in the evidence directory and are excluded from the nine final proposal slots.', '']
    (OUT / 'RECAP.md').write_text('\n'.join(recap), encoding='utf8')
    stages = {
        '1. PI and import': ['import', 'pi'],
        '2. Automatic Review Orchestrator': ['beta-review'],
        '3. Financial Analyzer': ['classification', 'pattern-recognition', 'behavior-agent', 'fx', 'financial-calculator', 'debt-calculator', 'debt-agent'],
        '4. Primary Generator': ['suggestion-generator'],
        '5. Checker and Critical Coverage': ['checker', 'critical-coverage', 'catalog-selector'],
        '6. Recommendation Engine': ['weights', 'ai-evaluation', 'scoring', 'robustness', 'decision-engine', 'explanation'],
        '7. Today and Feedback': ['beta-review', 'feedback', 'assistant', 'conversation-memory'],
    }
    stage_path = OUT / 'SEVEN-STAGES.md'
    base = stage_path.read_text(encoding='utf8').split('## Actual stage evidence')[0]
    appendix = ['## Actual stage evidence', '', 'These are saved executions, not proposed examples. Each capture states whether its role ran or used fallback.', '']
    for name, slugs in stages.items():
        appendix += ['### ' + name, '']
        for profile, run in baseline_runs.items():
            available = [slug for slug in slugs if (RUNS / run / profile / (slug + '.md')).exists()]
            appendix.append('- ' + profile.title() + ': ' + ' · '.join(f'[{slug}]({link(run, profile, slug)})' for slug in available))
        appendix.append('')
    stage_path.write_text(base + '\n'.join(appendix), encoding='utf8')
    print(OUT / 'RECAP.md')


if __name__ == '__main__':
    main()
