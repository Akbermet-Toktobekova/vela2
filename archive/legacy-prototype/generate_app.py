import json
import re

with open('svgs.json', 'r', encoding='utf-8') as f:
    svgs = json.load(f)

def clean_svg(svg_str, extra_class=''):
    s = re.sub(r'preserveAspectRatio="none"', '', svg_str)
    s = re.sub(r'style="[^"]*"', '', s)
    s = re.sub(r'fill="(?:white|#E2E2E8|#8E9193|#C4C7C9)"', 'fill="currentColor"', s)
    if extra_class:
        s = s.replace('<svg ', f'<svg class="{extra_class}" ')
    return s.strip()

brand_svg = clean_svg(svgs['b436f.svg'], 'icon-svg')
settings_svg = clean_svg(svgs['ff037.svg'], 'icon-svg')
sparkle_svg = clean_svg(svgs['550e0.svg'], 'icon-svg')
assistant_svg = clean_svg(svgs['aed26.svg'], 'icon-svg')
income_svg = clean_svg(svgs['acd5f.svg'], 'icon-svg')
update_svg = clean_svg(svgs['b2246.svg'], 'icon-svg')
statement_svg = clean_svg(svgs['9c3d3.svg'], 'icon-svg')
home_svg = clean_svg(svgs['19d64.svg'], 'icon-svg')
energy_svg = clean_svg(svgs['9e815.svg'], 'icon-svg')
wifi_svg = clean_svg(svgs['f5533.svg'], 'icon-svg')
nav_today_svg = clean_svg(svgs['18d29.svg'], 'icon-svg')
nav_plan_svg = clean_svg(svgs['ce19a.svg'], 'icon-svg')
nav_assistant_svg = clean_svg(svgs['1df7b.svg'], 'icon-svg')

print("All SVGs cleaned and prepared.")
