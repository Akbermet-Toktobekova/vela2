"""Compare the retained Gemini capture with the latest completed capture."""
import json
import re
from pathlib import Path

evidence = Path(__file__).resolve().parents[4] / 'docs/testing/live-review'
previous = re.search(r'Run ([0-9TZ-]+)', (evidence / 'GEMINI-RECAP.md').read_text(encoding='utf-8')).group(1)
current = re.search(r'Run ([0-9TZ-]+)', (evidence / 'RECAP.md').read_text(encoding='utf-8')).group(1)
lines = ['# Model run comparison', '', f'Previous capture {previous}. Current capture {current}.', '',
         '[Previous Gemini recap](GEMINI-RECAP.md) · [Current recap](RECAP.md) · [Seven-stage logs](SEVEN-STAGES.md)', '',
         'The profiles, financial reference date and financial policy are the same. Live model responses can vary between runs.', '']
for profile in ['debt', 'strong', 'nora']:
    lines += ['## ' + profile.title(), '']
    for label, run in [('Previous Gemini', previous), ('Current run', current)]:
        folder = evidence / 'runs' / run / profile
        def read(stage):
            return json.loads((folder / (stage + '.json')).read_text(encoding='utf-8'))
        decision = read('beta-review')['output']['decision']
        checker = read('checker')['output']
        generation = read('suggestion-generator')['output']
        calls = [call for path in folder.glob('*.json') for call in json.loads(path.read_text(encoding='utf-8')).get('calls', [])]
        models = sorted({call['response']['modelUsed'] for call in calls if call['response']['liveCallUsed']})
        fallbacks = [{'stage': path.stem, 'reason': call['response'].get('fallbackReason')} for path in folder.glob('*.json')
                     for call in json.loads(path.read_text(encoding='utf-8')).get('calls', []) if not call['response']['liveCallUsed']]
        summary = {
            'models': models,
            'decision': decision['decisionStatus'], 'actionId': decision['selectedActionId'],
            'title': decision['title'], 'score': decision['score'],
            'generatedProposals': len(generation.get('data', {}).get('proposals', [])),
            'generationExplanation': generation.get('data', {}).get('shortfallReason'),
            'checkerVerdicts': [{'id': row['id'], 'status': row['status'], 'reason': row['reason']} for row in checker.get('primary', [])],
            'fallbacks': fallbacks,
        }
        lines += ['### ' + label, '', '```json', json.dumps(summary, ensure_ascii=False, indent=2), '```', '',
                  f'[Actual decision](runs/{run}/{profile}/beta-review.md) · [Checker](runs/{run}/{profile}/checker.md)', '']
        for stage in ['pattern-recognition', 'behavior-agent', 'debt-agent']:
            text = read(stage).get('summary')
            if text:
                lines += ['**' + stage + '**', '', text, '']
(evidence / 'MODEL-COMPARISON.md').write_text('\n'.join(lines), encoding='utf-8')
print(evidence / 'MODEL-COMPARISON.md')
