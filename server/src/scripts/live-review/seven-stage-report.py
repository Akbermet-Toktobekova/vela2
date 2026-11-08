"""Render seven-stage results from the completed runtime capture."""
import argparse
import json
import re
from collections import Counter
from pathlib import Path

root = Path(__file__).resolve().parents[4]
evidence = root / 'docs/testing/live-review'
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--gemma-comparison', action='store_true')
args = parser.parse_args()
report_dir = evidence / 'gemma-4-31b' if args.gemma_comparison else evidence
evidence_prefix = '../' if args.gemma_comparison else ''
recap = (report_dir / 'RECAP.md').read_text(encoding='utf-8')
run_id = re.search(r'Run ([0-9TZ-]+)', recap).group(1)
groups = [
    ('Personal Information Database', ['import', 'pi', 'as', 'conversation-memory']),
    ('Automatic Review Orchestrator', ['beta-review']),
    ('Financial Analyzer', ['fx', 'classification', 'pattern-recognition', 'behavior-agent', 'financial-calculator', 'debt-calculator', 'debt-agent']),
    ('AI Suggestion Generator', ['suggestion-generator']),
    ('Checker and Critical Action Coverage', ['checker', 'critical-coverage', 'catalog-selector']),
    ('Final Recommendation Engine', ['weights', 'ai-evaluation', 'impact', 'scoring', 'robustness', 'decision-engine']),
    ('Proactive Recommendation and Feedback', ['explanation', 'assistant', 'feedback']),
]
lines = ['# Vela seven-stage results', '', f'Runtime capture {run_id}.', '',
         f'[Full recap](RECAP.md) · [Formula explanation]({evidence_prefix}FORMULAS.md) · [Storage map]({evidence_prefix}PI-STORAGE.md)', '',
         'Logs contain the actual requests, outputs, summaries and encrypted SQLite readbacks.', '']
if args.gemma_comparison:
    lines += ['The project limits supplied for each Gemma model were 30 requests per minute, 16K input tokens per minute and 14.4K requests per day. The model logs count attempts from this capture. Project-wide usage comes from Google AI Studio.', '']
for profile in ['debt', 'strong', 'nora']:
    captures = {path.stem: json.loads(path.read_text(encoding='utf-8')) for path in (evidence / 'runs' / run_id / profile).glob('*.json')}
    if 'beta-review' not in captures or 'run-error' in captures:
        raise RuntimeError(profile + ' capture is incomplete')
    lines += ['## ' + profile.title(), '']
    if args.gemma_comparison:
        attempts = [call for capture in captures.values() for call in capture['calls']]
        successful = Counter(call['response']['modelUsed'] for call in attempts if call['response'].get('liveCallUsed'))
        unsuccessful = Counter(call['attemptedModel'] for call in attempts if not call['response'].get('liveCallUsed'))
        for model in sorted(successful.keys() | unsuccessful.keys()):
            lines += [f'- `{model}` delivered {successful[model]} live responses, with {unsuccessful[model]} failed or invalid attempts.']
        http_errors = Counter(call['response']['fallbackReason'].removeprefix('Retryable HTTP Error: ')
                              for call in attempts if call['response'].get('fallbackReason', '').startswith('Retryable HTTP Error: '))
        for reason, count in sorted(http_errors.items()):
            lines += [f'- Google API returned {count} responses with `{reason}`.']
        lines += ['']
    for index, (title, stages) in enumerate(groups, 1):
        lines += [f'### {index}. {title}', '']
        for stage in stages:
            keys = sorted(key for key in captures if key == stage or key.startswith(stage + '-'))
            for key in keys:
                capture = captures[key]
                base = f'{evidence_prefix}runs/{run_id}/{profile}/{key}'
                lines += [f"- **{key}** — {capture['status']}. [Readable log]({base}.md) · [Exact inputs and outputs]({base}.json)", '']
                if capture.get('summary'):
                    lines += [capture['summary'], '']
                output = capture.get('output')
                if key == 'suggestion-generator':
                    data = output.get('data', output) if isinstance(output, dict) else output
                    lines += ['Generated proposals and evidence limitations', '', '```json', json.dumps(data, indent=2), '```', '']
                elif key == 'checker':
                    rows = output.get('primary', [])
                    lines += [f"- **{row['id']} · {row['title']}** — {row['status']}. {row['description']} Checker: {row['reason']} Origin: {row.get('origin', 'MODEL')}." for row in rows]
                    if not rows:
                        lines += ['The primary generator returned no proposals. Catalog and critical coverage show the subsequent branch.']
                    lines += ['']
                elif key == 'financial-calculator':
                    values = {field: output.get(field) for field in ['currency', 'referenceDate', 'liquidExpenseCoverageMonths', 'emergencyReserveAllocated', 'emergencyReserveCoverageMonths', 'optionalActionCash']}
                    lines += ['```json', json.dumps(values, indent=2), '```', '']
                elif key == 'beta-review':
                    decision = output.get('decision', {})
                    lines += [f"Published decision {decision.get('decisionStatus')}. Action {decision.get('selectedActionId')}. {decision.get('title')}.",
                              f"Score {decision.get('score')}. Priority {decision.get('priorityClass')}. Snapshot {decision.get('snapshotId')}.", '']
                elif key == 'feedback':
                    values = {field: output.get(field) for field in ['status', 'accepted', 'reviewPending', 'rejectionReason']}
                    lines += ['```json', json.dumps(values, indent=2), '```', '']
(report_dir / 'SEVEN-STAGES.md').write_text('\n'.join(lines), encoding='utf-8')
print(report_dir / 'SEVEN-STAGES.md')
