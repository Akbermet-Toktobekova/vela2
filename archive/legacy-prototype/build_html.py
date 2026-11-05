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

html_content = f"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Vela — Soft Glass Finance (iPhone Mockup)</title>
  <!-- Google Fonts: Manrope -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    /* CSS Reset & Variables */
    *, *::before, *::after {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }}

    :root {{
      --primary-text: #272e23;
      --secondary-text: #74766d;
      --accent-green: #386641;
      --cushion-green: #2a6f44;
      --glass-bg: rgba(255, 255, 255, 0.48);
      --glass-border: rgba(255, 255, 255, 0.86);
      --glass-card-shadow: 0 8px 30px rgba(53, 59, 40, 0.065);
      --font-main: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }}

    body {{
      font-family: var(--font-main);
      color: var(--primary-text);
      background: #18191b;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 24px 16px;
      overflow-x: hidden;
    }}

    /* Top Device Toolbar (Browser Controls) */
    .device-toolbar {{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      width: 100%;
      max-width: 480px;
      margin-bottom: 20px;
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      padding: 10px 16px;
      color: #f1f2f0;
      z-index: 100;
    }}

    .toolbar-title {{
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.2px;
    }}

    .toolbar-title span.badge {{
      background: #3b82f6;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}

    .toolbar-buttons {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .toolbar-btn {{
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }}

    .toolbar-btn:hover {{
      background: rgba(255, 255, 255, 0.22);
      transform: translateY(-1px);
    }}

    .toolbar-btn.active {{
      background: #ffffff;
      color: #1a1a1a;
      border-color: #ffffff;
      font-weight: 600;
    }}

    /* iPhone 16 Pro Frame Shell */
    .phone-container {{
      position: relative;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }}

    /* Frame Mode (Realistic iPhone) */
    .phone-container.frame-mode {{
      width: 400px;
      height: 844px;
      border-radius: 54px;
      background: #1e2022;
      padding: 12px;
      box-shadow: 
        0 0 0 2px #44474a,
        0 0 0 5px #1c1d1f,
        0 25px 60px -15px rgba(0, 0, 0, 0.75),
        0 10px 25px -5px rgba(0, 0, 0, 0.5),
        inset 0 0 4px 2px rgba(255, 255, 255, 0.12);
    }}

    /* Side Buttons on iPhone chassis */
    .phone-container.frame-mode::before {{
      content: '';
      position: absolute;
      left: -4px;
      top: 115px;
      width: 4px;
      height: 32px;
      background: #3a3c3e;
      border-radius: 4px 0 0 4px;
      box-shadow: -1px 0 2px rgba(0,0,0,0.4);
    }}

    .phone-container.frame-mode::after {{
      content: '';
      position: absolute;
      left: -4px;
      top: 165px;
      width: 4px;
      height: 58px;
      background: #3a3c3e;
      border-radius: 4px 0 0 4px;
      box-shadow: 
        -1px 0 2px rgba(0,0,0,0.4),
        0 70px 0 #3a3c3e; /* Volume Down button */
    }}

    .power-btn {{
      display: none;
    }}

    .phone-container.frame-mode .power-btn {{
      display: block;
      position: absolute;
      right: -4px;
      top: 175px;
      width: 4px;
      height: 80px;
      background: #3a3c3e;
      border-radius: 0 4px 4px 0;
      box-shadow: 1px 0 2px rgba(0,0,0,0.4);
    }}

    /* Fullscreen Mobile View Mode */
    .phone-container.fullscreen-mode {{
      width: 100%;
      max-width: 440px;
      height: 100vh;
      border-radius: 0;
      padding: 0;
      box-shadow: none;
      background: transparent;
    }}

    /* iPhone Screen Viewport */
    .screen-viewport {{
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 44px;
      overflow: hidden;
      background: 
        radial-gradient(circle at 12% 10%, rgba(255, 255, 255, 0.94) 0, transparent 27rem),
        radial-gradient(circle at 88% 52%, rgba(255, 255, 255, 0.7) 0, transparent 32rem),
        linear-gradient(145deg, #f2f2ef 0%, #e3e5df 48%, #f8f7f2 100%);
      display: flex;
      flex-direction: column;
    }}

    .phone-container.fullscreen-mode .screen-viewport {{
      border-radius: 0;
    }}

    /* Ambient Background blobs */
    .screen-viewport::before,
    .screen-viewport::after {{
      content: '';
      position: absolute;
      border-radius: 999px;
      pointer-events: none;
      filter: blur(2px);
      z-index: 0;
    }}

    .screen-viewport::before {{
      width: 19rem;
      height: 19rem;
      left: -8rem;
      top: 20%;
      background: rgba(190, 199, 178, 0.22);
    }}

    .screen-viewport::after {{
      width: 24rem;
      height: 24rem;
      right: -12rem;
      bottom: 5%;
      background: rgba(221, 205, 179, 0.2);
    }}

    /* iOS Status Bar */
    .status-bar {{
      position: relative;
      z-index: 40;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      color: #272e23;
      user-select: none;
    }}

    .status-time {{
      font-size: 14.5px;
      font-weight: 700;
      letter-spacing: -0.2px;
    }}

    .status-icons {{
      display: flex;
      align-items: center;
      gap: 6px;
    }}

    /* Dynamic Island */
    .dynamic-island {{
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 118px;
      height: 32px;
      background: #000000;
      border-radius: 20px;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }}

    .dynamic-island.expanded {{
      width: 220px;
      height: 42px;
      border-radius: 22px;
      padding: 0 16px;
    }}

    .island-camera {{
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #111422;
      border: 1px solid #1c223a;
      box-shadow: inset 0 0 3px #050711;
    }}

    .island-sensor {{
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #0b0d17;
    }}

    .island-alert-text {{
      display: none;
      color: #a8f0b0;
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
    }}

    .dynamic-island.expanded .island-alert-text {{
      display: block;
    }}

    /* App Scrollable Container */
    .app-scrollable {{
      position: relative;
      z-index: 10;
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 100px;
    }}

    /* Scrollbar styling */
    .app-scrollable::-webkit-scrollbar {{
      width: 4px;
    }}
    .app-scrollable::-webkit-scrollbar-thumb {{
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }}

    /* Top Navigation Header */
    .top-header {{
      position: sticky;
      top: 0;
      z-index: 30;
      width: 100%;
      background: rgba(255, 255, 255, 0.35);
      border-bottom: 1px solid rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 58px;
      padding: 0 20px;
    }}

    .logo-container {{
      display: flex;
      align-items: center;
      gap: 10px;
    }}

    .icon-tile {{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.52);
      border: 1px solid rgba(255, 255, 255, 0.75);
      box-shadow: 0 2px 6px rgba(0,0,0,0.02);
      color: #272e23;
    }}

    .brand-name {{
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: #272e23;
    }}

    .icon-btn {{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.75);
      color: #74766d;
      cursor: pointer;
      transition: all 0.2s ease;
    }}

    .icon-btn:active {{
      transform: scale(0.92);
      background: rgba(255, 255, 255, 0.75);
    }}

    /* Content Area */
    .app-main {{
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 14px 18px 20px 18px;
    }}

    /* Glass Cards */
    .glass-card {{
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      box-shadow: var(--glass-card-shadow);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-radius: 20px;
      padding: 18px;
      position: relative;
    }}

    .eyebrow {{
      font-size: 11px;
      line-height: 14px;
      font-weight: 700;
      letter-spacing: 0.55px;
      text-transform: uppercase;
      color: var(--secondary-text);
      display: flex;
      align-items: center;
      gap: 6px;
    }}

    /* Recommendation Card */
    .recommendation-card {{
      background: rgba(255, 255, 255, 0.62);
      border: 1px solid rgba(255, 255, 255, 0.9);
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: all 0.3s ease;
    }}

    .card-top {{
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }}

    .card-title {{
      font-size: 20px;
      font-weight: 700;
      line-height: 26px;
      letter-spacing: -0.2px;
      margin-top: 4px;
      color: var(--primary-text);
    }}

    .priority-badge {{
      background: rgba(255, 255, 255, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.85);
      font-size: 11px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 6px;
      color: #272e23;
      white-space: nowrap;
    }}

    .card-desc {{
      font-size: 13px;
      line-height: 20px;
      color: var(--secondary-text);
      letter-spacing: 0.1px;
    }}

    .card-desc strong {{
      color: var(--primary-text);
      font-weight: 600;
    }}

    .action-row {{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
    }}

    .btn-primary {{
      flex: 1;
      height: 42px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.95);
      box-shadow: 0 2px 7px rgba(0, 0, 0, 0.05);
      color: var(--primary-text);
      font-size: 13px;
      font-weight: 700;
      font-family: var(--font-main);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 14px;
      transition: all 0.2s ease;
    }}

    .btn-primary:active {{
      transform: scale(0.97);
      background: #ffffff;
    }}

    .btn-primary.completed {{
      background: #386641;
      color: #ffffff;
      border-color: #386641;
    }}

    .btn-secondary {{
      height: 42px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.42);
      border: 1px solid rgba(255, 255, 255, 0.82);
      color: var(--primary-text);
      font-size: 13px;
      font-weight: 600;
      font-family: var(--font-main);
      cursor: pointer;
      padding: 0 14px;
      transition: all 0.2s ease;
    }}

    .btn-secondary:active {{
      transform: scale(0.97);
      background: rgba(255, 255, 255, 0.7);
    }}

    .btn-quiet {{
      height: 42px;
      border-radius: 12px;
      background: transparent;
      border: none;
      color: var(--secondary-text);
      font-size: 13px;
      font-weight: 600;
      font-family: var(--font-main);
      cursor: pointer;
      padding: 0 10px;
    }}

    .btn-icon-sq {{
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.42);
      border: 1px solid rgba(255, 255, 255, 0.82);
      color: var(--primary-text);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }}

    .btn-icon-sq:active {{
      transform: scale(0.95);
    }}

    /* Balance Section */
    .balance-card {{
      display: flex;
      flex-direction: column;
      gap: 16px;
    }}

    .balance-top {{
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }}

    .balance-amount {{
      font-size: 36px;
      font-weight: 700;
      letter-spacing: -0.9px;
      line-height: 42px;
      margin-top: 2px;
    }}

    .confirmed-badge {{
      display: flex;
      align-items: center;
      gap: 5px;
      background: rgba(255, 255, 255, 0.52);
      border: 1px solid rgba(255, 255, 255, 0.75);
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 11px;
      font-weight: 600;
      color: var(--secondary-text);
      white-space: nowrap;
    }}

    .dot {{
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #74766d;
    }}

    .ledger {{
      border-top: 1px solid rgba(214, 216, 209, 0.8);
      padding-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }}

    .ledger-row {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0;
      font-size: 13px;
    }}

    .ledger-row-label {{
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--secondary-text);
    }}

    .dot-bullet {{
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #8f9288;
    }}

    .ledger-row-val {{
      font-weight: 600;
      color: var(--primary-text);
    }}

    .available-row {{
      margin-top: 6px;
      background: rgba(255, 255, 255, 0.58);
      border: 1px solid rgba(255, 255, 255, 0.8);
      border-radius: 12px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}

    .available-val {{
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.3px;
      color: var(--primary-text);
    }}

    /* Quick Actions */
    .quick-actions-grid {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }}

    .action-card {{
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 14px;
      padding: 12px 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-align: center;
      min-height: 80px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(53, 59, 40, 0.04);
      transition: all 0.2s ease;
    }}

    .action-card:active {{
      transform: translateY(2px) scale(0.97);
      background: rgba(255, 255, 255, 0.7);
    }}

    .action-card-text {{
      font-size: 11px;
      font-weight: 600;
      line-height: 14px;
      color: var(--primary-text);
      max-width: 82px;
    }}

    /* Upcoming Obligations */
    .obligations-header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 4px;
      margin-top: 4px;
    }}

    .obligations-title {{
      font-size: 12.5px;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: var(--primary-text);
    }}

    .obligations-total {{
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.4px;
      color: var(--secondary-text);
    }}

    .obligations-list {{
      display: flex;
      flex-direction: column;
      gap: 8px;
    }}

    .obligation-card {{
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 14px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 10px rgba(53, 59, 40, 0.03);
    }}

    .obligation-card:hover {{
      background: rgba(255, 255, 255, 0.65);
    }}

    .obligation-card:active {{
      transform: scale(0.98);
    }}

    .obligation-left {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}

    .obligation-name {{
      font-size: 14.5px;
      font-weight: 600;
      color: var(--primary-text);
    }}

    .obligation-due {{
      font-size: 11px;
      font-weight: 600;
      color: var(--secondary-text);
      letter-spacing: 0.4px;
    }}

    .obligation-right {{
      text-align: right;
    }}

    .obligation-amount {{
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.1px;
      color: var(--primary-text);
    }}

    .obligation-type {{
      font-size: 11px;
      color: var(--secondary-text);
    }}

    /* Floating Soft Glass Navigation Bar */
    .glass-nav-bar {{
      position: absolute;
      bottom: 22px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 36px);
      max-width: 360px;
      background: rgba(255, 255, 255, 0.58);
      border: 1px solid rgba(255, 255, 255, 0.94);
      box-shadow: 0 10px 32px rgba(53, 59, 40, 0.08);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-radius: 28px;
      padding: 6px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      z-index: 60;
    }}

    .nav-btn {{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-height: 48px;
      border-radius: 22px;
      background: transparent;
      border: none;
      color: var(--secondary-text);
      font-family: var(--font-main);
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 0.4px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }}

    .nav-btn.active {{
      background: rgba(255, 255, 255, 0.88);
      color: var(--primary-text);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      font-weight: 700;
    }}

    .nav-btn:active {{
      transform: scale(0.95);
    }}

    /* iOS Home Indicator Bar */
    .home-indicator {{
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 134px;
      height: 4.5px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 10px;
      z-index: 70;
      pointer-events: none;
    }}

    /* Other Screens (Tabs) */
    .tab-content {{
      display: none;
      animation: fadeIn 0.3s ease;
    }}

    .tab-content.active {{
      display: flex;
      flex-direction: column;
      gap: 16px;
    }}

    @keyframes fadeIn {{
      from {{ opacity: 0; transform: translateY(6px); }}
      to {{ opacity: 1; transform: translateY(0); }}
    }}

    /* Plan & Assistant Tab Layouts */
    .plan-card {{
      display: flex;
      flex-direction: column;
      gap: 12px;
    }}

    .progress-bar-bg {{
      width: 100%;
      height: 10px;
      background: rgba(0, 0, 0, 0.06);
      border-radius: 10px;
      overflow: hidden;
    }}

    .progress-bar-fill {{
      height: 100%;
      background: #386641;
      border-radius: 10px;
      width: 28%;
      transition: width 0.5s ease;
    }}

    .chat-bubble {{
      padding: 12px 14px;
      border-radius: 16px;
      font-size: 13px;
      line-height: 19px;
      max-width: 86%;
    }}

    .chat-bubble.bot {{
      background: rgba(255, 255, 255, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.9);
      align-self: flex-start;
      color: var(--primary-text);
    }}

    .chat-bubble.user {{
      background: #386641;
      color: #fff;
      align-self: flex-end;
    }}

    .prompt-chip {{
      background: rgba(255, 255, 255, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.85);
      border-radius: 18px;
      padding: 7px 12px;
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text);
      cursor: pointer;
      text-align: left;
      transition: all 0.2s ease;
    }}

    .prompt-chip:active {{
      background: #fff;
      transform: scale(0.97);
    }}

    /* Interactive Modal Sheet */
    .modal-overlay {{
      display: none;
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 90;
      align-items: flex-end;
    }}

    .modal-overlay.open {{
      display: flex;
    }}

    .modal-sheet {{
      width: 100%;
      background: rgba(248, 248, 245, 0.95);
      border-top: 1px solid rgba(255, 255, 255, 0.9);
      border-radius: 28px 28px 0 0;
      padding: 20px 22px 34px 22px;
      box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px);
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }}

    @keyframes slideUp {{
      from {{ transform: translateY(100%); }}
      to {{ transform: translateY(0); }}
    }}

    .sheet-handle {{
      width: 38px;
      height: 4px;
      background: #c2c4bc;
      border-radius: 4px;
      margin: 0 auto 16px auto;
    }}

    /* Toast Notification */
    .toast {{
      position: absolute;
      top: 64px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: rgba(39, 46, 35, 0.92);
      color: #fff;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 80;
      box-shadow: 0 4px 14px rgba(0,0,0,0.2);
    }}

    .toast.show {{
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }}

    /* SVG Icons color & filter */
    .icon-svg {{
      width: 16px;
      height: 16px;
      display: inline-block;
      vertical-align: middle;
      color: #272e23;
    }}

    .icon-svg.muted {{
      color: #74766d;
      opacity: 0.8;
    }}

    .icon-svg.sm {{
      width: 13px;
      height: 13px;
    }}

    .icon-svg.lg {{
      width: 19px;
      height: 19px;
    }}
  </style>
</head>
<body>

  <!-- Top Device Toolbar for Testing -->
  <div class="device-toolbar">
    <div class="toolbar-title">
      <div style="width: 10px; height: 10px; border-radius: 50%; background: #22c55e;"></div>
      <span>Vela Soft Glass UI</span>
      <span class="badge">iPhone 16 Pro</span>
    </div>
    <div class="toolbar-buttons">
      <button class="toolbar-btn active" id="btnModeFrame" onclick="setMode('frame')">
        📱 Рамка iPhone
      </button>
      <button class="toolbar-btn" id="btnModeFull" onclick="setMode('fullscreen')">
        ↔️ На весь экран
      </button>
      <button class="toolbar-btn" onclick="resetState()" title="Сбросить баланс и действия">
        🔄 Сброс
      </button>
    </div>
  </div>

  <!-- iPhone Chassis Frame -->
  <div class="phone-container frame-mode" id="phoneContainer">
    <div class="power-btn"></div>
    
    <!-- iPhone Screen -->
    <div class="screen-viewport">
      
      <!-- iOS Status Bar -->
      <div class="status-bar">
        <span class="status-time" id="currentTime">9:41</span>
        
        <!-- Dynamic Island -->
        <div class="dynamic-island" id="dynamicIsland" onclick="toggleIsland()">
          <div class="island-camera"></div>
          <span class="island-alert-text" id="islandText">Vela • Safe Cushion</span>
          <div class="island-sensor"></div>
        </div>

        <div class="status-icons">
          <!-- Signal Icon -->
          <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
            <rect x="0" y="7" width="2.5" height="4" rx="0.5"/>
            <rect x="4" y="5" width="2.5" height="6" rx="0.5"/>
            <rect x="8" y="2.5" width="2.5" height="8.5" rx="0.5"/>
            <rect x="12" y="0" width="2.5" height="11" rx="0.5"/>
          </svg>
          <!-- 5G / WiFi Icon -->
          <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor">
            <path d="M7 2.2C9.5 2.2 11.7 3.3 13.2 5.1L7 11.2 0.8 5.1C2.3 3.3 4.5 2.2 7 2.2ZM7 0C3.9 0 1.1 1.4 0 3.6L7 11L14 3.6C12.9 1.4 10.1 0 7 0Z"/>
          </svg>
          <!-- Battery Icon -->
          <svg width="22" height="11" viewBox="0 0 22 11" fill="currentColor">
            <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor" fill="none"/>
            <rect x="2" y="2" width="13" height="7" rx="1.5" fill="currentColor"/>
            <path d="M20 3.5V7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <!-- Toast Feedback -->
      <div class="toast" id="toastMessage">€40 переведено в подушку безопасности</div>

      <!-- App Scrollable Body -->
      <div class="app-scrollable">
        
        <!-- App Top Header -->
        <header class="top-header">
          <div class="logo-container">
            <div class="icon-tile">
              {brand_svg}
            </div>
            <span class="brand-name">Vela</span>
          </div>
          <button class="icon-btn" onclick="openSheet('settings')" aria-label="Настройки">
            {settings_svg}
          </button>
        </header>

        <!-- Main Content Area -->
        <main class="app-main">
          
          <!-- TAB 1: TODAY (Main Dashboard) -->
          <div class="tab-content active" id="tabToday">
            
            <!-- Priority Recommendation Card -->
            <section class="glass-card recommendation-card" id="recommendationCard">
              <div class="card-top">
                <div>
                  <div class="eyebrow">
                    {sparkle_svg}
                    <span>Recommended next step</span>
                  </div>
                  <h1 class="card-title">Put €40 into safety cushion</h1>
                </div>
                <span class="priority-badge">Priority</span>
              </div>

              <p class="card-desc">
                Leaves <strong>€60</strong> safe to spend. Increases cushion buffer to <strong>12%</strong> of upcoming volatility.
              </p>

              <div class="action-row">
                <button class="btn-primary" id="btnReserve" onclick="handleReserve()">
                  Reserve €40
                </button>
                <button class="btn-secondary" onclick="openSheet('adjust')">
                  Adjust
                </button>
                <button class="btn-quiet" onclick="dismissRecommendation()">
                  Not now
                </button>
                <button class="btn-icon-sq" onclick="switchTab('Assistant')" aria-label="Спросить ассистента">
                  {assistant_svg}
                </button>
              </div>
            </section>

            <!-- Total Balance Card -->
            <section class="glass-card balance-card">
              <div class="balance-top">
                <div>
                  <p class="eyebrow">Total balance</p>
                  <p class="balance-amount" id="totalBalanceVal">€1,000.00</p>
                </div>
                <div class="confirmed-badge">
                  <span class="dot"></span>
                  <span>Confirmed 09:30 AM</span>
                </div>
              </div>

              <div class="ledger">
                <div class="ledger-row">
                  <div class="ledger-row-label">
                    <span class="dot-bullet"></span>
                    <span>Protected money</span>
                  </div>
                  <span class="ledger-row-val" id="protectedMoneyVal">€100.00</span>
                </div>

                <div class="ledger-row">
                  <div class="ledger-row-label">
                    <span class="dot-bullet"></span>
                    <span>Essential expenses</span>
                  </div>
                  <span class="ledger-row-val">€800.00</span>
                </div>

                <div class="available-row">
                  <span class="eyebrow" style="margin: 0;">Available to spend</span>
                  <span class="available-val" id="availableSpendVal">€100.00</span>
                </div>
              </div>
            </section>

            <!-- Quick Actions (3 Grid Buttons) -->
            <div class="quick-actions-grid">
              <button class="action-card" onclick="openSheet('income')">
                <div style="color: #272e23;">{income_svg}</div>
                <span class="action-card-text">Add income</span>
              </button>
              <button class="action-card" onclick="openSheet('update')">
                <div style="color: #272e23;">{update_svg}</div>
                <span class="action-card-text">Update balance</span>
              </button>
              <button class="action-card" onclick="openSheet('statement')">
                <div style="color: #272e23;">{statement_svg}</div>
                <span class="action-card-text">Upload Statement</span>
              </button>
            </div>

            <!-- Upcoming Obligations -->
            <section style="display: flex; flex-direction: column; gap: 8px;">
              <div class="obligations-header">
                <h2 class="obligations-title">Upcoming obligations</h2>
                <span class="obligations-total">€800.00 Total</span>
              </div>

              <div class="obligations-list">
                <!-- Obligation 1 -->
                <article class="obligation-card" onclick="openBillDetails('Apartment Rent', '€650.00', 'Due in 3 days', 'Fixed charge')">
                  <div class="obligation-left">
                    <div class="icon-tile" style="width: 34px; height: 34px; border-radius: 9px;">
                      {home_svg}
                    </div>
                    <div>
                      <h3 class="obligation-name">Apartment Rent</h3>
                      <p class="obligation-due">Due in 3 days</p>
                    </div>
                  </div>
                  <div class="obligation-right">
                    <p class="obligation-amount">€650.00</p>
                    <p class="obligation-type">Fixed charge</p>
                  </div>
                </article>

                <!-- Obligation 2 -->
                <article class="obligation-card" onclick="openBillDetails('Clean Energy Grid', '€95.00', 'Due in 5 days', 'Direct debit')">
                  <div class="obligation-left">
                    <div class="icon-tile" style="width: 34px; height: 34px; border-radius: 9px;">
                      {energy_svg}
                    </div>
                    <div>
                      <h3 class="obligation-name">Clean Energy Grid</h3>
                      <p class="obligation-due">Due in 5 days</p>
                    </div>
                  </div>
                  <div class="obligation-right">
                    <p class="obligation-amount">€95.00</p>
                    <p class="obligation-type">Direct debit</p>
                  </div>
                </article>

                <!-- Obligation 3 -->
                <article class="obligation-card" onclick="openBillDetails('Fiber Optic', '€55.00', 'Due in 6 days', 'Auto-renew')">
                  <div class="obligation-left">
                    <div class="icon-tile" style="width: 34px; height: 34px; border-radius: 9px;">
                      {wifi_svg}
                    </div>
                    <div>
                      <h3 class="obligation-name">Fiber Optic</h3>
                      <p class="obligation-due">Due in 6 days</p>
                    </div>
                  </div>
                  <div class="obligation-right">
                    <p class="obligation-amount">€55.00</p>
                    <p class="obligation-type">Auto-renew</p>
                  </div>
                </article>
              </div>
            </section>
          </div>

          <!-- TAB 2: MY PLAN (Financial Roadmap) -->
          <div class="tab-content" id="tabPlan">
            <section class="glass-card plan-card">
              <div class="card-top">
                <div>
                  <div class="eyebrow">{sparkle_svg} <span>Monthly Cushion Goal</span></div>
                  <h2 class="card-title">Target: €500.00</h2>
                </div>
                <span class="priority-badge">Level 1</span>
              </div>
              <p class="card-desc">Current cushion: <strong id="planCurrentCushion">€100.00</strong> (20% of goal)</p>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" id="planProgressFill" style="width: 20%;"></div>
              </div>
              <p style="font-size: 11.5px; color: var(--secondary-text);">
                Based on your cashflow volatility, €500 will protect you from 95% of unexpected bills.
              </p>
            </section>

            <section class="glass-card" style="display: flex; flex-direction: column; gap: 10px;">
              <div class="eyebrow"><span>Volatility Breakdown</span></div>
              <div class="ledger-row">
                <span style="color: var(--secondary-text);">Fixed Outflows</span>
                <span style="font-weight: 600;">€800.00 / mo</span>
              </div>
              <div class="ledger-row">
                <span style="color: var(--secondary-text);">Discretionary Spend Cap</span>
                <span style="font-weight: 600;">€100.00 / wk</span>
              </div>
              <div class="ledger-row">
                <span style="color: var(--secondary-text);">Safe Reserve Rate</span>
                <span style="font-weight: 600; color: #386641;">12% suggested</span>
              </div>
            </section>
          </div>

          <!-- TAB 3: ASSISTANT (Vela AI Chat) -->
          <div class="tab-content" id="tabAssistant">
            <section class="glass-card" style="display: flex; flex-direction: column; gap: 12px; min-height: 280px;">
              <div class="eyebrow">{assistant_svg} <span>Vela Financial Assistant</span></div>
              
              <div id="chatMessages" style="display: flex; flex-direction: column; gap: 10px; margin-top: 4px;">
                <div class="chat-bubble bot">
                  Привет! Я Vela Assistant. Твой баланс <strong>€1,000</strong>, из которых <strong>€800</strong> зарезервировано под счета. Чем помочь сегодня?
                </div>
              </div>

              <div style="margin-top: auto; display: flex; flex-direction: column; gap: 6px; padding-top: 10px;">
                <p style="font-size: 11px; font-weight: 700; color: var(--secondary-text); text-transform: uppercase;">
                  Быстрые вопросы:
                </p>
                <div class="prompt-chip" onclick="askAssistant('Сколько можно потратить на выходных?')">
                  💳 Сколько можно потратить на выходных?
                </div>
                <div class="prompt-chip" onclick="askAssistant('Как оптимизировать платежи за энергию?')">
                  ⚡ Как оптимизировать счет за энергию?
                </div>
                <div class="prompt-chip" onclick="askAssistant('Когда лучше пополнить резерв?')">
                  🛡️ Когда лучше пополнить резерв?
                </div>
              </div>
            </section>
          </div>

        </main>
      </div>

      <!-- Floating Soft Glass Bottom Navigation Bar -->
      <nav class="glass-nav-bar" aria-label="Primary navigation">
        <button class="nav-btn active" id="navToday" onclick="switchTab('Today')">
          <span style="display: flex;">{nav_today_svg}</span>
          <span>Today</span>
        </button>
        <button class="nav-btn" id="navPlan" onclick="switchTab('My Plan')">
          <span style="display: flex;">{nav_plan_svg}</span>
          <span>My Plan</span>
        </button>
        <button class="nav-btn" id="navAssistant" onclick="switchTab('Assistant')">
          <span style="display: flex;">{nav_assistant_svg}</span>
          <span>Assistant</span>
        </button>
      </nav>

      <!-- Bottom Home Indicator -->
      <div class="home-indicator"></div>

      <!-- Modal Bottom Sheet -->
      <div class="modal-overlay" id="modalOverlay" onclick="closeSheet(event)">
        <div class="modal-sheet" onclick="event.stopPropagation()">
          <div class="sheet-handle"></div>
          <div id="modalSheetContent"></div>
        </div>
      </div>

    </div>
  </div>

  <script>
    // State
    const state = {{
      activeTab: 'Today',
      isReserved: false,
      totalBalance: 1000.0,
      protectedMoney: 100.0,
      availableSpend: 100.0,
      essentialExpenses: 800.0,
    }};

    // Update real-time clock
    function updateClock() {{
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      minutes = minutes < 10 ? '0' + minutes : minutes;
      document.getElementById('currentTime').innerText = hours + ':' + minutes;
    }}
    updateClock();
    setInterval(updateClock, 10000);

    // Frame Mode vs Fullscreen Mode
    function setMode(mode) {{
      const container = document.getElementById('phoneContainer');
      const btnFrame = document.getElementById('btnModeFrame');
      const btnFull = document.getElementById('btnModeFull');
      
      if (mode === 'fullscreen') {{
        container.classList.remove('frame-mode');
        container.classList.add('fullscreen-mode');
        btnFull.classList.add('active');
        btnFrame.classList.remove('active');
      }} else {{
        container.classList.remove('fullscreen-mode');
        container.classList.add('frame-mode');
        btnFrame.classList.add('active');
        btnFull.classList.remove('active');
      }}
    }}

    // Switch Bottom Tabs
    function switchTab(tabName) {{
      state.activeTab = tabName;
      
      // Update nav buttons
      document.getElementById('navToday').className = 'nav-btn' + (tabName === 'Today' ? ' active' : '');
      document.getElementById('navPlan').className = 'nav-btn' + (tabName === 'My Plan' ? ' active' : '');
      document.getElementById('navAssistant').className = 'nav-btn' + (tabName === 'Assistant' ? ' active' : '');

      // Update content
      document.getElementById('tabToday').className = 'tab-content' + (tabName === 'Today' ? ' active' : '');
      document.getElementById('tabPlan').className = 'tab-content' + (tabName === 'My Plan' ? ' active' : '');
      document.getElementById('tabAssistant').className = 'tab-content' + (tabName === 'Assistant' ? ' active' : '');
    }}

    // Reserve 40 Action
    function handleReserve() {{
      if (state.isReserved) return;
      
      state.isReserved = true;
      state.protectedMoney += 40.0;
      state.availableSpend -= 40.0;
      
      // Update DOM
      document.getElementById('protectedMoneyVal').innerText = '€' + state.protectedMoney.toFixed(2);
      document.getElementById('availableSpendVal').innerText = '€' + state.availableSpend.toFixed(2);
      
      const btn = document.getElementById('btnReserve');
      btn.innerText = 'Reserved ✓';
      btn.classList.add('completed');
      
      // Update Plan tab
      document.getElementById('planCurrentCushion').innerText = '€' + state.protectedMoney.toFixed(2);
      const pct = Math.round((state.protectedMoney / 500) * 100);
      document.getElementById('planProgressFill').style.width = pct + '%';

      // Dynamic Island expansion & Toast
      showToast('€40 успешно добавлены в подушку!');
      expandIsland('€40 Added to Cushion');
    }}

    // Dismiss Recommendation Card
    function dismissRecommendation() {{
      const card = document.getElementById('recommendationCard');
      card.style.opacity = '0';
      card.style.transform = 'translateY(-10px)';
      setTimeout(() => {{
        card.style.display = 'none';
      }}, 300);
      showToast('Рекомендация скрыта');
    }}

    // Dynamic Island Animation
    let islandTimeout = null;
    function expandIsland(text) {{
      const island = document.getElementById('dynamicIsland');
      const islandText = document.getElementById('islandText');
      if (text) islandText.innerText = text;
      
      island.classList.add('expanded');
      clearTimeout(islandTimeout);
      islandTimeout = setTimeout(() => {{
        island.classList.remove('expanded');
      }}, 3000);
    }}

    function toggleIsland() {{
      const island = document.getElementById('dynamicIsland');
      island.classList.toggle('expanded');
    }}

    // Toast message
    let toastTimeout = null;
    function showToast(msg) {{
      const toast = document.getElementById('toastMessage');
      toast.innerText = msg;
      toast.classList.add('show');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {{
        toast.classList.remove('show');
      }}, 2600);
    }}

    // Bottom Sheets
    function openSheet(type) {{
      const overlay = document.getElementById('modalOverlay');
      const content = document.getElementById('modalSheetContent');
      
      if (type === 'income') {{
        content.innerHTML = `
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Add Income</h3>
          <p style="font-size: 13px; color: var(--secondary-text); margin-bottom: 16px;">
            Enter incoming payment or salary to update your balances.
          </p>
          <input type="number" id="incomeInput" placeholder="Amount (e.g. 500)" style="width: 100%; height: 44px; border-radius: 12px; border: 1px solid #d2d4cd; padding: 0 14px; font-size: 16px; margin-bottom: 14px; font-family: var(--font-main);">
          <button class="btn-primary" style="width: 100%;" onclick="confirmIncome()">Add to Balance</button>
        `;
      }} else if (type === 'update') {{
        content.innerHTML = `
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Update Balance</h3>
          <p style="font-size: 13px; color: var(--secondary-text); margin-bottom: 16px;">
            Sync your latest bank connection or manually enter current funds.
          </p>
          <button class="btn-primary" style="width: 100%; margin-bottom: 8px;" onclick="syncBank()">Sync Bank API (Live)</button>
          <button class="btn-secondary" style="width: 100%;" onclick="closeSheet()">Cancel</button>
        `;
      }} else if (type === 'statement') {{
        content.innerHTML = `
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Upload Statement</h3>
          <p style="font-size: 13px; color: var(--secondary-text); margin-bottom: 16px;">
            Upload PDF or CSV statement from your bank to automatically detect recurring obligations.
          </p>
          <div style="border: 2px dashed #b8bab1; border-radius: 14px; padding: 24px; text-align: center; margin-bottom: 16px; cursor: pointer;" onclick="simulateUpload()">
            <p style="font-size: 14px; font-weight: 600; color: #272e23;">Drop statement file here</p>
            <p style="font-size: 11px; color: #74766d; margin-top: 4px;">Supports PDF, CSV, OFX</p>
          </div>
          <button class="btn-secondary" style="width: 100%;" onclick="closeSheet()">Close</button>
        `;
      }} else if (type === 'adjust') {{
        content.innerHTML = `
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Adjust Cushion Reserve</h3>
          <p style="font-size: 13px; color: var(--secondary-text); margin-bottom: 14px;">
            Choose how much to allocate from your available €100.
          </p>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;">
            <button class="btn-secondary" onclick="customReserve(20)">€20 (5%)</button>
            <button class="btn-secondary" onclick="customReserve(40)">€40 (12%)</button>
            <button class="btn-secondary" onclick="customReserve(60)">€60 (18%)</button>
          </div>
          <button class="btn-quiet" style="width: 100%; text-align: center;" onclick="closeSheet()">Cancel</button>
        `;
      }} else if (type === 'settings') {{
        content.innerHTML = `
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 12px;">Settings</h3>
          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 14px; font-weight: 600;">Haptic & Sounds</span>
              <input type="checkbox" checked style="width: 20px; height: 20px;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 14px; font-weight: 600;">Volatility Alerts</span>
              <input type="checkbox" checked style="width: 20px; height: 20px;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 14px; font-weight: 600;">Currency</span>
              <span style="font-size: 14px; font-weight: 700; color: #386641;">EUR (€)</span>
            </div>
          </div>
          <button class="btn-primary" style="width: 100%;" onclick="closeSheet()">Done</button>
        `;
      }}
      overlay.classList.add('open');
    }}

    function closeSheet(e) {{
      document.getElementById('modalOverlay').classList.remove('open');
    }}

    function openBillDetails(name, amount, due, type) {{
      const overlay = document.getElementById('modalOverlay');
      const content = document.getElementById('modalSheetContent');
      content.innerHTML = `
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">${{name}}</h3>
        <p style="font-size: 13px; color: var(--secondary-text); margin-bottom: 16px;">Obligation Details</p>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
          <div class="ledger-row">
            <span style="color: var(--secondary-text);">Status</span>
            <span style="font-weight: 600; color: #b45309;">${{due}}</span>
          </div>
          <div class="ledger-row">
            <span style="color: var(--secondary-text);">Amount</span>
            <span style="font-size: 18px; font-weight: 700;">${{amount}}</span>
          </div>
          <div class="ledger-row">
            <span style="color: var(--secondary-text);">Billing Type</span>
            <span style="font-weight: 600;">${{type}}</span>
          </div>
          <div class="ledger-row">
            <span style="color: var(--secondary-text);">Auto-deduction</span>
            <span style="font-weight: 600; color: #386641;">Scheduled ✓</span>
          </div>
        </div>
        <button class="btn-primary" style="width: 100%;" onclick="closeSheet()">Pay Early / Manage</button>
      `;
      overlay.classList.add('open');
    }}

    function confirmIncome() {{
      const input = document.getElementById('incomeInput');
      const val = parseFloat(input.value);
      if (isNaN(val) || val <= 0) return;
      
      state.totalBalance += val;
      state.availableSpend += val;
      document.getElementById('totalBalanceVal').innerText = '€' + state.totalBalance.toFixed(2);
      document.getElementById('availableSpendVal').innerText = '€' + state.availableSpend.toFixed(2);
      closeSheet();
      showToast('Доход €' + val.toFixed(2) + ' успешно добавлен!');
      expandIsland('+€' + val.toFixed(2) + ' Income Added');
    }}

    function customReserve(amount) {{
      state.isReserved = true;
      state.protectedMoney += amount;
      state.availableSpend -= amount;
      document.getElementById('protectedMoneyVal').innerText = '€' + state.protectedMoney.toFixed(2);
      document.getElementById('availableSpendVal').innerText = '€' + state.availableSpend.toFixed(2);
      
      const btn = document.getElementById('btnReserve');
      btn.innerText = 'Reserved €' + amount + ' ✓';
      btn.classList.add('completed');
      closeSheet();
      showToast('Зарезервировано €' + amount);
      expandIsland('€' + amount + ' Reserved');
    }}

    function syncBank() {{
      closeSheet();
      showToast('Синхронизация с банком выполнена!');
      expandIsland('Bank Synced • 09:31 AM');
    }}

    function simulateUpload() {{
      closeSheet();
      showToast('Выписка обработана: 3 обязательства подтверждены');
      expandIsland('Statement Analyzed');
    }}

    // Assistant Chat interaction
    function askAssistant(promptText) {{
      const chatBox = document.getElementById('chatMessages');
      
      // User message
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.innerText = promptText;
      chatBox.appendChild(userBubble);
      
      // Typing response
      setTimeout(() => {{
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot';
        if (promptText.includes('выходных')) {{
          botBubble.innerHTML = `С учетом обязательств в €800, твоя безопасная сумма на выходные составляет <strong>€60</strong>. Резерв в €40 защитит от перерасхода.`;
        }} else if (promptText.includes('энергию')) {{
          botBubble.innerHTML = `Твой средний чек за электроэнергию составляет <strong>€95/мес</strong>. В Vela можно настроить ночной тариф со скидкой до 18%.`;
        }} else {{
          botBubble.innerHTML = `Рекомендуется пополнять резерв сразу после прихода дохода, пока доступно <strong>€100</strong>.`;
        }}
        chatBox.appendChild(botBubble);
      }}, 500);
    }}

    function resetState() {{
      state.totalBalance = 1000.0;
      state.protectedMoney = 100.0;
      state.availableSpend = 100.0;
      state.isReserved = false;
      document.getElementById('totalBalanceVal').innerText = '€1,000.00';
      document.getElementById('protectedMoneyVal').innerText = '€100.00';
      document.getElementById('availableSpendVal').innerText = '€100.00';
      const btn = document.getElementById('btnReserve');
      btn.innerText = 'Reserve €40';
      btn.classList.remove('completed');
      const card = document.getElementById('recommendationCard');
      card.style.display = 'flex';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      showToast('Состояние сброшено к исходному');
    }}
  </script>
</body>
</html>
"""

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print('Successfully generated index.html, size:', len(html_content))
