"""Render the saved primary drafts and Checker results without calling Google."""
import argparse
import json
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('comparison_run')
parser.add_argument('input_run')
parser.add_argument('--recovery-run', action='append', default=[])
args = parser.parse_args()
evidence = Path(__file__).resolve().parents[4] / 'docs/testing/live-review'

models = {
    'gemini-3.5-flash-lite': 'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite': 'gemini-3.1-flash-lite',
    'gemma-4-31b-it': 'gemma-4-31b',
    'gemma-4-26b-a4b-it': 'gemma-4-26b-a4b',
}


def read_capture(base, name):
    path = evidence / base / (name + '.json')
    return json.loads(path.read_text(encoding='utf-8')) if path.is_file() else None


summaries = []
for model, folder in models.items():
    lines = [
        f'# Primary proposals for {model}', '',
        f'Generator requests come from the saved inputs in {args.input_run}. Independent model capture {args.comparison_run}.', '',
        'The titles and descriptions below come from model drafts. Checker verdicts are recorded separately. Deterministic clarification slots are excluded from the draft list.', '',
        '[Model comparison](../gemma-4-31b/PRIMARY-COMPARISON.md) · [Full Gemma pipeline recap](../gemma-4-31b/RECAP.md) · [Earlier captures](../old/RECAP.md)', '',
    ]
    saved = model == 'gemini-3.5-flash-lite'
    live_profiles = 0
    draft_count = 0
    valid_count = 0
    for profile in ['debt', 'strong', 'nora']:
        base = f'runs/{args.input_run if saved else args.comparison_run}/{profile}'
        prefix = '' if saved else model + '-'
        draft_name = prefix + 'suggestion-generator'
        checker_name = prefix + 'checker'
        draft = read_capture(base, draft_name)
        checked = read_capture(base, checker_name)
        lines += [f'## {profile.title()}', '']
        if draft is None:
            error_name = prefix + 'run-error'
            error = read_capture(base, error_name)
            if error:
                lines += [f"Capture failed. {error['output']['message']} [Run error](../{base}/{error_name}.md)", '']
            else:
                lines += ['No capture was saved.', '']
            continue
        links = [f'[Generator input and output](../{base}/{draft_name}.md)']
        if checked:
            links.append(f'[Checker verdicts](../{base}/{checker_name}.md)')
        for run in args.recovery_run if model == 'gemma-4-31b-it' else []:
            recovery_base = f'runs/{run}/{profile}'
            recovered = read_capture(recovery_base, draft_name)
            if recovered:
                links.append(f'[Recovery attempt {run}](../{recovery_base}/{draft_name}.md)')
                if not (draft['output'] or {}).get('liveCallUsed') and (recovered['output'] or {}).get('liveCallUsed'):
                    draft = recovered
                    checked = read_capture(recovery_base, checker_name)
                    if checked:
                        links.append(f'[Recovery Checker verdicts](../{recovery_base}/{checker_name}.md)')
        lines += [' · '.join(links), '']
        generation = draft['output'] or {}
        if not generation.get('liveCallUsed'):
            lines += [f"No live draft was available. {generation.get('fallbackReason', 'See the attempt log.')}", '']
            continue
        if generation.get('modelUsed') != model:
            raise RuntimeError(f'{profile} expected {model} but got {generation.get("modelUsed")}')
        proposals = (generation.get('data') or {}).get('proposals', [])
        verdicts = (checked['output'].get('primary', []) if saved else checked['output']['proposals']) if checked else []
        live_profiles += 1
        draft_count += len(proposals)
        by_id = {verdict['id']: verdict for verdict in verdicts}
        for index, proposal in enumerate(proposals, 1):
            verdict = by_id.get(f'primary-{index}')
            lines += [f"{index}. **{proposal.get('title') or 'Untitled draft'}**. {proposal.get('description') or ''}" if isinstance(proposal, dict) else f'{index}. Malformed draft `{json.dumps(proposal)}`.']
            if verdict:
                valid_count += verdict['status'] == 'VALID'
                lines += [f"   Checker **{verdict['status']}**. {verdict['reason']}"]
        if not proposals:
            lines += ['The model returned an empty proposal list.']
        lines += ['']

    model_dir = evidence / folder
    model_dir.mkdir(exist_ok=True)
    (model_dir / 'PRIMARY-PROPOSALS.md').write_text('\n'.join(lines), encoding='utf-8')
    recap = model_dir / 'RECAP.md'
    if not recap.exists():
        recap.write_text(f'# {model} results\n\n[Debt, Strong and Nora primary drafts and verdicts](PRIMARY-PROPOSALS.md).\n\n[Comparison index](../gemma-4-31b/PRIMARY-COMPARISON.md).\n', encoding='utf-8')
    summaries.append(f'- [{model}](../{folder}/PRIMARY-PROPOSALS.md). Live results for {live_profiles}/3 profiles, {draft_count} drafts, {valid_count} valid.')

report = evidence / 'gemma-4-31b/PRIMARY-COMPARISON.md'
lines = ['# Primary proposals by model', '',
         f'All models used the saved generator inputs from {args.input_run}. Gemini 3.5 Flash Lite uses the original capture.', '',
         *summaries,
         '- [Earlier captures](../old/RECAP.md)', '']
report.write_text('\n'.join(lines), encoding='utf-8')
print(report)
