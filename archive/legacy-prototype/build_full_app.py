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
  <title>Vela — Soft Glass Finance & Onboarding (iPhone Mockup)</title>
  
  <!-- Google Fonts: Manrope -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    /* CSS Reset & Design Tokens */
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
      --glass-bg: rgba(255, 255, 255, 0.52);
      --glass-border: rgba(255, 255, 255, 0.88);
      --glass-card-shadow: 0 8px 30px rgba(53, 59, 40, 0.065);
      --font-main: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }}

    body {{
      font-family: var(--font-main);
      color: var(--primary-text);
      background: #141517;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 20px 14px;
      overflow-x: hidden;
    }}

    /* Top Device Toolbar (Browser Controls) */
    .device-toolbar {{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      max-width: 440px;
      margin-bottom: 16px;
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      padding: 10px 14px;
      color: #f1f2f0;
      z-index: 100;
    }}

    .toolbar-title {{
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 600;
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
      gap: 6px;
      flex-wrap: wrap;
    }}

    .toolbar-btn {{
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      border-radius: 8px;
      padding: 5px 11px;
      font-size: 11.5px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
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
      font-weight: 700;
    }}

    /* iPhone 16 Pro Frame Shell */
    .phone-container {{
      position: relative;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }}

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
        0 70px 0 #3a3c3e;
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

    .phone-container.fullscreen-mode {{
      width: 100%;
      max-width: 430px;
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
      width: 230px;
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

    /* Views (Onboarding View vs Main App View) */
    .app-view {{
      display: none;
      position: relative;
      z-index: 10;
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }}

    .app-view.active {{
      display: flex;
      flex-direction: column;
    }}

    /* Scrollbar styling */
    .app-view::-webkit-scrollbar {{
      width: 4px;
    }}
    .app-view::-webkit-scrollbar-thumb {{
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
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

    /* Buttons */
    .btn-primary {{
      height: 44px;
      border-radius: 13px;
      background: rgba(255, 255, 255, 0.92);
      border: 1px solid rgba(255, 255, 255, 0.95);
      box-shadow: 0 2px 7px rgba(0, 0, 0, 0.05);
      color: var(--primary-text);
      font-size: 13.5px;
      font-weight: 700;
      font-family: var(--font-main);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 16px;
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
      height: 44px;
      border-radius: 13px;
      background: rgba(255, 255, 255, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.85);
      color: var(--primary-text);
      font-size: 13px;
      font-weight: 600;
      font-family: var(--font-main);
      cursor: pointer;
      padding: 0 14px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }}

    .btn-secondary:active {{
      transform: scale(0.97);
      background: rgba(255, 255, 255, 0.7);
    }}

    .btn-quiet {{
      height: 44px;
      border-radius: 13px;
      background: transparent;
      border: none;
      color: var(--secondary-text);
      font-size: 13px;
      font-weight: 600;
      font-family: var(--font-main);
      cursor: pointer;
      padding: 0 10px;
    }}

    /* Inputs */
    .glass-input {{
      width: 100%;
      height: 46px;
      border-radius: 13px;
      background: rgba(255, 255, 255, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.9);
      padding: 0 14px;
      font-size: 14.5px;
      font-family: var(--font-main);
      color: var(--primary-text);
      outline: none;
      transition: border 0.2s ease;
    }}

    .glass-input:focus {{
      border-color: #386641;
      background: rgba(255, 255, 255, 0.85);
    }}

    /* ========================================================
       ONBOARDING FLOW STYLES (10 SCREENS)
       ======================================================== */
    .onboarding-container {{
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 12px 20px 24px 20px;
      position: relative;
    }}

    .onboarding-progress-bar {{
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 16px;
    }}

    .progress-segment {{
      flex: 1;
      height: 3.5px;
      background: rgba(0, 0, 0, 0.08);
      border-radius: 3px;
      transition: background 0.3s ease;
    }}

    .progress-segment.active {{
      background: #386641;
    }}

    .onboarding-top-nav {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 36px;
      margin-bottom: 12px;
    }}

    .nav-back-btn {{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.8);
      cursor: pointer;
      color: var(--primary-text);
      font-weight: 700;
      transition: transform 0.2s ease;
    }}

    .nav-back-btn:active {{
      transform: scale(0.92);
    }}

    .nav-skip-btn {{
      background: transparent;
      border: none;
      color: var(--secondary-text);
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      padding: 6px 8px;
    }}

    .onboarding-screen {{
      display: none;
      flex-direction: column;
      gap: 16px;
      flex: 1;
      animation: fadeIn 0.3s ease;
    }}

    .onboarding-screen.active {{
      display: flex;
    }}

    .ob-hero-title {{
      font-size: 26px;
      font-weight: 800;
      line-height: 32px;
      letter-spacing: -0.6px;
      color: var(--primary-text);
    }}

    .ob-subtitle {{
      font-size: 13.5px;
      line-height: 21px;
      color: var(--secondary-text);
      margin-top: 4px;
    }}

    /* Selectable options chips/cards */
    .choice-card {{
      background: rgba(255, 255, 255, 0.55);
      border: 1px solid rgba(255, 255, 255, 0.85);
      border-radius: 14px;
      padding: 13px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-text);
    }}

    .choice-card:active {{
      transform: scale(0.98);
    }}

    .choice-card.selected {{
      background: rgba(255, 255, 255, 0.9);
      border-color: #386641;
      box-shadow: 0 4px 14px rgba(56, 102, 65, 0.12);
      color: #386641;
    }}

    .choice-check {{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1.5px solid #c2c4bd;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      color: transparent;
      transition: all 0.2s ease;
    }}

    .choice-card.selected .choice-check {{
      background: #386641;
      border-color: #386641;
      color: #fff;
    }}

    /* Outcome Demo Cards */
    .demo-step-card {{
      background: rgba(255, 255, 255, 0.55);
      border: 1px solid rgba(255, 255, 255, 0.85);
      border-radius: 16px;
      padding: 14px;
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }}

    .demo-step-icon {{
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      shrink: 0;
    }}

    /* Account List Items */
    .account-badge-item {{
      background: rgba(255, 255, 255, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.85);
      border-radius: 14px;
      padding: 11px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}

    .account-role-tag {{
      font-size: 10.5px;
      font-weight: 600;
      background: rgba(56, 102, 65, 0.1);
      color: #386641;
      padding: 2px 7px;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }}

    /* Statement Upload Card */
    .statement-row {{
      background: rgba(255, 255, 255, 0.55);
      border: 1px solid rgba(255, 255, 255, 0.85);
      border-radius: 14px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}

    /* Confirmation Question Card */
    .confirm-card {{
      background: rgba(255, 255, 255, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.9);
      border-radius: 16px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }}

    .confirm-options {{
      display: flex;
      gap: 6px;
    }}

    .confirm-btn {{
      flex: 1;
      height: 36px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.8);
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: var(--font-main);
    }}

    .confirm-btn.active {{
      background: #386641;
      color: #fff;
      border-color: #386641;
    }}

    /* ========================================================
       MAIN APP STYLES (TODAY / MY PLAN / ASSISTANT)
       ======================================================== */
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
      height: 56px;
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

    .app-main {{
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 14px 18px 110px 18px;
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

    .btn-icon-sq {{
      width: 44px;
      height: 44px;
      border-radius: 13px;
      background: rgba(255, 255, 255, 0.42);
      border: 1px solid rgba(255, 255, 255, 0.82);
      color: var(--primary-text);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
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

    /* ========================================================
       MY PLAN (FINANCIAL ANALYTICS & CHARTS)
       ======================================================== */
    .chart-container {{
      width: 100%;
      position: relative;
    }}

    .bar-chart-row {{
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      height: 120px;
      padding: 10px 0 6px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      gap: 10px;
    }}

    .chart-bar-group {{
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      height: 100%;
      justify-content: flex-end;
    }}

    .chart-bar {{
      width: 100%;
      max-width: 38px;
      border-radius: 8px 8px 3px 3px;
      transition: height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }}

    .chart-bar.inflow {{
      background: linear-gradient(180deg, #52b788 0%, #2d6a4f 100%);
    }}
    .chart-bar.essential {{
      background: linear-gradient(180deg, #f4a261 0%, #e76f51 100%);
    }}
    .chart-bar.discretionary {{
      background: linear-gradient(180deg, #90e0ef 0%, #0096c7 100%);
    }}
    .chart-bar.cushion {{
      background: linear-gradient(180deg, #386641 0%, #1b4332 100%);
    }}

    .chart-bar-val {{
      font-size: 10px;
      font-weight: 700;
      color: var(--primary-text);
    }}

    .chart-bar-label {{
      font-size: 10.5px;
      font-weight: 600;
      color: var(--secondary-text);
    }}

    /* Donut chart legend */
    .donut-layout {{
      display: flex;
      align-items: center;
      gap: 16px;
    }}

    .donut-legend {{
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }}

    .legend-item {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
    }}

    .legend-color {{
      width: 10px;
      height: 10px;
      border-radius: 3px;
      margin-right: 6px;
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

    /* Chat in Assistant */
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
  </style>
</head>
<body>

  <!-- Top Device Toolbar for Testing -->
  <div class="device-toolbar">
    <div class="toolbar-title">
      <div style="width: 10px; height: 10px; border-radius: 50%; background: #22c55e;"></div>
      <span>Vela</span>
      <span class="badge">iOS 18</span>
    </div>
    <div class="toolbar-buttons">
      <button class="toolbar-btn" id="btnToggleOnboarding" onclick="toggleMainFlow('onboarding')">
        ✨ Onboarding
      </button>
      <button class="toolbar-btn active" id="btnToggleApp" onclick="toggleMainFlow('app')">
        📱 App (Today & Plan)
      </button>
      <button class="toolbar-btn" id="btnModeFrame" onclick="setMode('frame')">
        iPhone
      </button>
      <button class="toolbar-btn" id="btnModeFull" onclick="setMode('fullscreen')">
        Full
      </button>
      <button class="toolbar-btn" onclick="resetState()" title="Сбросить состояние">
        🔄
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
          <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
            <rect x="0" y="7" width="2.5" height="4" rx="0.5"/>
            <rect x="4" y="5" width="2.5" height="6" rx="0.5"/>
            <rect x="8" y="2.5" width="2.5" height="8.5" rx="0.5"/>
            <rect x="12" y="0" width="2.5" height="11" rx="0.5"/>
          </svg>
          <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor">
            <path d="M7 2.2C9.5 2.2 11.7 3.3 13.2 5.1L7 11.2 0.8 5.1C2.3 3.3 4.5 2.2 7 2.2ZM7 0C3.9 0 1.1 1.4 0 3.6L7 11L14 3.6C12.9 1.4 10.1 0 7 0Z"/>
          </svg>
          <svg width="22" height="11" viewBox="0 0 22 11" fill="currentColor">
            <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor" fill="none"/>
            <rect x="2" y="2" width="13" height="7" rx="1.5" fill="currentColor"/>
            <path d="M20 3.5V7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <!-- Toast Feedback -->
      <div class="toast" id="toastMessage">€40 переведено в подушку безопасности</div>

      <!-- =========================================================
           VIEW 1: ONBOARDING FLOW (10 SPECIFIED SCREENS)
           ========================================================= -->
      <div class="app-view" id="viewOnboarding">
        <div class="onboarding-container">
          
          <!-- Top Step Progress & Navigation -->
          <div class="onboarding-progress-bar" id="onboardingProgressBar">
            <!-- 10 segments generated by JS -->
          </div>

          <div class="onboarding-top-nav">
            <button class="nav-back-btn" id="obBackBtn" onclick="prevOnboardingStep()" aria-label="Назад">
              ←
            </button>
            <span style="font-size: 11px; font-weight: 700; color: var(--secondary-text); text-transform: uppercase;" id="stepNumberLabel">
              Step 1 of 10
            </span>
            <button class="nav-skip-btn" onclick="skipToMainApp()">
              Skip
            </button>
          </div>

          <!-- SCREEN 1: WELCOME TO VELA -->
          <div class="onboarding-screen active" id="obScreen1">
            <div style="margin-top: 10px; margin-bottom: 20px;">
              <div class="icon-tile" style="width: 48px; height: 48px; border-radius: 14px; margin-bottom: 16px;">
                <span style="transform: scale(1.3); display: flex;">{brand_svg}</span>
              </div>
              <p class="eyebrow" style="margin-bottom: 6px;">Vela Finance</p>
              <h1 class="ob-hero-title">Your money, one step at a time.</h1>
              <p class="ob-subtitle" style="margin-top: 10px;">
                Understand your finances, discover your next best step, and learn why it matters.
              </p>
            </div>

            <div class="glass-card" style="display: flex; flex-direction: column; gap: 10px; padding: 16px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #386641; font-size: 14px;">✓</span>
                <span style="font-size: 13.5px; font-weight: 600;">Less confusion. More clarity.</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #386641; font-size: 14px;">✓</span>
                <span style="font-size: 13.5px; font-weight: 600;">A friendly guide that moves at your pace.</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #386641; font-size: 14px;">✓</span>
                <span style="font-size: 13.5px; font-weight: 600;">No manual budgeting chores.</span>
              </div>
            </div>

            <div style="margin-top: auto; padding-top: 20px;">
              <button class="btn-primary" style="width: 100%; height: 50px; font-size: 15px;" onclick="nextOnboardingStep()">
                Get started →
              </button>
            </div>
          </div>

          <!-- SCREEN 2: CREATE ACCOUNT -->
          <div class="onboarding-screen" id="obScreen2">
            <div>
              <p class="eyebrow">Identity</p>
              <h1 class="ob-hero-title">Create Account</h1>
              <p class="ob-subtitle">Let's make your money feel a little clearer.</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 10px;">
              <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--secondary-text); margin-bottom: 5px; display: block;">Your name / nickname</label>
                <input type="text" class="glass-input" id="obInputName" value="Alex" placeholder="e.g. Alex or Anna">
              </div>

              <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--secondary-text); margin-bottom: 5px; display: block;">Email</label>
                <input type="email" class="glass-input" id="obInputEmail" value="alex@example.com" placeholder="name@domain.com">
              </div>

              <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--secondary-text); margin-bottom: 5px; display: block;">Verification code</label>
                <div style="display: flex; gap: 8px;">
                  <input type="text" class="glass-input" style="text-align: center; font-size: 18px; font-weight: 700; letter-spacing: 6px;" value="8 4 9 2" readonly>
                </div>
              </div>
            </div>

            <div class="glass-card" style="padding: 12px 14px; font-size: 12px; color: var(--secondary-text); margin-top: 6px;">
              🔒 <strong>Bank-grade privacy:</strong> Your data is encrypted and never sold to third parties.
            </div>

            <div style="margin-top: auto; padding-top: 20px;">
              <button class="btn-primary" style="width: 100%; height: 50px;" onclick="nextOnboardingStep()">
                Continue →
              </button>
            </div>
          </div>

          <!-- SCREEN 3: MEET VELA (OUTCOME DEMO) -->
          <div class="onboarding-screen" id="obScreen3">
            <div>
              <p class="eyebrow">Outcome Demo</p>
              <h1 class="ob-hero-title">Meet Vela</h1>
              <p class="ob-subtitle">Here is how Vela turns chaos into clarity.</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
              <div class="demo-step-card">
                <div class="demo-step-icon">😟</div>
                <div>
                  <h3 style="font-size: 14.5px; font-weight: 700;">Confused</h3>
                  <p style="font-size: 12.5px; color: var(--secondary-text); margin-top: 2px;">
                    Bills, spending, goals. Too much to figure out every month.
                  </p>
                </div>
              </div>

              <div class="demo-step-card" style="background: rgba(255, 255, 255, 0.75); border-color: rgba(56, 102, 65, 0.3);">
                <div class="demo-step-icon" style="background: rgba(56, 102, 65, 0.15); color: #386641;">✨</div>
                <div>
                  <h3 style="font-size: 14.5px; font-weight: 700; color: #386641;">Vela helps</h3>
                  <p style="font-size: 12.5px; color: var(--secondary-text); margin-top: 2px;">
                    Your money gets organized into one clear picture automatically.
                  </p>
                </div>
              </div>

              <div class="demo-step-card">
                <div class="demo-step-icon">🎯</div>
                <div>
                  <h3 style="font-size: 14.5px; font-weight: 700;">One next step</h3>
                  <p style="font-size: 12.5px; color: var(--secondary-text); margin-top: 2px;">
                    You always know exactly what to focus on first.
                  </p>
                </div>
              </div>
            </div>

            <p style="font-size: 13px; font-weight: 600; text-align: center; color: var(--primary-text); margin-top: 10px;">
              Now, let's start with what matters to you.
            </p>

            <div style="margin-top: auto; padding-top: 16px;">
              <button class="btn-primary" style="width: 100%; height: 50px;" onclick="nextOnboardingStep()">
                Let's do this →
              </button>
            </div>
          </div>

          <!-- SCREEN 4: WHAT MATTERS TO YOU? -->
          <div class="onboarding-screen" id="obScreen4">
            <div>
              <p class="eyebrow">Priority</p>
              <h1 class="ob-hero-title">What's on your mind about money?</h1>
              <p class="ob-subtitle">Choose what feels most important right now.</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;" id="concernOptionsList">
              <div class="choice-card selected" onclick="selectConcern(this, 'save_more')">
                <span>I want to save more</span>
                <div class="choice-check">✓</div>
              </div>

              <div class="choice-card" onclick="selectConcern(this, 'debt')">
                <span>I have debt to deal with</span>
                <div class="choice-check">✓</div>
              </div>

              <div class="choice-card" onclick="selectConcern(this, 'spending_visibility')">
                <span>I don't know where my money goes</span>
                <div class="choice-check">✓</div>
              </div>

              <div class="choice-card" onclick="selectConcern(this, 'payday_short')">
                <span>I often run short before payday</span>
                <div class="choice-check">✓</div>
              </div>

              <div class="choice-card" onclick="selectConcern(this, 'specific_goal')">
                <span>I'm saving for something specific</span>
                <div class="choice-check">✓</div>
              </div>

              <div class="choice-card" onclick="selectConcern(this, 'not_sure')">
                <span>I'm not sure yet</span>
                <div class="choice-check">✓</div>
              </div>
            </div>

            <div style="margin-top: auto; padding-top: 16px;">
              <button class="btn-primary" style="width: 100%; height: 50px;" onclick="nextOnboardingStep()">
                Continue →
              </button>
            </div>
          </div>

          <!-- SCREEN 5: YOUR ACCOUNTS -->
          <div class="onboarding-screen" id="obScreen5">
            <div>
              <p class="eyebrow">Accounts</p>
              <h1 class="ob-hero-title">Where do you keep your money?</h1>
              <p class="ob-subtitle">Start with the account you use most. Add others now or later.</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
              <div class="account-badge-item">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 18px;">💳</span>
                  <div>
                    <h4 style="font-size: 14px; font-weight: 700;">Revolut</h4>
                    <p style="font-size: 11.5px; color: var(--secondary-text);">EUR • €450.00 reported</p>
                  </div>
                </div>
                <span class="account-role-tag">Daily spending</span>
              </div>

              <div class="account-badge-item">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 18px;">🌐</span>
                  <div>
                    <h4 style="font-size: 14px; font-weight: 700;">Wise</h4>
                    <p style="font-size: 11.5px; color: var(--secondary-text);">EUR • Inflow hub</p>
                  </div>
                </div>
                <span class="account-role-tag">Receiving income</span>
              </div>

              <div class="account-badge-item">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 18px;">🏦</span>
                  <div>
                    <h4 style="font-size: 14px; font-weight: 700;">OTP</h4>
                    <p style="font-size: 11.5px; color: var(--secondary-text);">HUF • Work account</p>
                  </div>
                </div>
                <span class="account-role-tag">Work / mixed</span>
              </div>
            </div>

            <!-- Add another account toggle -->
            <button class="btn-secondary" style="width: 100%; border-style: dashed; margin-top: 6px;" onclick="showToast('Счет добавлен в список!')">
              + Add another bank account
            </button>

            <div style="margin-top: auto; padding-top: 16px;">
              <button class="btn-primary" style="width: 100%; height: 50px;" onclick="nextOnboardingStep()">
                Continue to Income →
              </button>
            </div>
          </div>

          <!-- SCREEN 6: YOUR INCOME -->
          <div class="onboarding-screen" id="obScreen6">
            <div>
              <p class="eyebrow">Cash Inflow</p>
              <h1 class="ob-hero-title">How does money usually come in?</h1>
              <p class="ob-subtitle">Understand your inflow pattern and timing.</p>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 6px;">
              <button class="btn-secondary active" style="flex: 1; font-size: 12px; background: rgba(255, 255, 255, 0.9); font-weight: 700; border-color: #386641;" onclick="setIncomePattern(this, 'Regular')">
                Regular
              </button>
              <button class="btn-secondary" style="flex: 1; font-size: 12px;" onclick="setIncomePattern(this, 'Irregular')">
                Irregular
              </button>
              <button class="btn-secondary" style="flex: 1; font-size: 12px;" onclick="setIncomePattern(this, 'Mixed')">
                Mixed
              </button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 10px;">
              <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--secondary-text); margin-bottom: 5px; display: block;">Approx. monthly income</label>
                <input type="text" class="glass-input" id="obIncomeAmount" value="€1,500" placeholder="e.g. €1,500">
              </div>

              <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--secondary-text); margin-bottom: 5px; display: block;">Primary receiving account</label>
                <select class="glass-input" style="cursor: pointer;">
                  <option>Wise (Receiving income)</option>
                  <option>Revolut (Daily spending)</option>
                  <option>OTP (Work)</option>
                </select>
              </div>
            </div>

            <div class="glass-card" style="padding: 12px 14px; font-size: 12px; color: var(--secondary-text); margin-top: 6px;">
              💡 Knowing your receiving account prevents double-counting internal transfers.
            </div>

            <div style="margin-top: auto; padding-top: 16px;">
              <button class="btn-primary" style="width: 100%; height: 50px;" onclick="nextOnboardingStep()">
                Continue to Commitments →
              </button>
            </div>
          </div>

          <!-- SCREEN 7: YOUR COMMITMENTS -->
          <div class="onboarding-screen" id="obScreen7">
            <div>
              <p class="eyebrow">Outflow & Commitments</p>
              <h1 class="ob-hero-title">What does your money need to cover?</h1>
              <p class="ob-subtitle">Essentials, fixed bills and any debt repayments.</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 6px;">
              <div class="glass-card" style="padding: 14px;">
                <label style="font-size: 12px; font-weight: 700; color: var(--secondary-text); margin-bottom: 4px; display: block;">
                  A. Monthly essentials (Rent, food, utilities)
                </label>
                <input type="text" class="glass-input" value="€900.00" placeholder="e.g. €900">
              </div>

              <div class="glass-card" style="padding: 14px;">
                <label style="font-size: 12px; font-weight: 700; color: var(--secondary-text); margin-bottom: 4px; display: block;">
                  B. Next critical upcoming payment
                </label>
                <div style="display: flex; gap: 8px;">
                  <input type="text" class="glass-input" style="flex: 2;" value="Apartment Rent" placeholder="Label">
                  <input type="text" class="glass-input" style="flex: 1;" value="€650" placeholder="Amount">
                </div>
              </div>

              <div class="glass-card" style="padding: 14px;">
                <label style="font-size: 12px; font-weight: 700; color: var(--secondary-text); margin-bottom: 4px; display: block;">
                  C. Active debts or credit cards
                </label>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 13.5px; font-weight: 600;">Credit card balance: €600.00</span>
                  <span class="account-role-tag" style="background: rgba(220, 38, 38, 0.1); color: #dc2626;">Active</span>
                </div>
              </div>
            </div>

            <div style="margin-top: auto; padding-top: 16px;">
              <button class="btn-primary" style="width: 100%; height: 50px;" onclick="nextOnboardingStep()">
                Continue to Statements →
              </button>
            </div>
          </div>

          <!-- SCREEN 8: LET VELA CONNECT THE DOTS -->
          <div class="onboarding-screen" id="obScreen8">
            <div>
              <p class="eyebrow">Bank Statements</p>
              <h1 class="ob-hero-title">Let Vela connect the dots.</h1>
              <p class="ob-subtitle">Add statements from the accounts you use. One month is a great start.</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
              <div class="statement-row">
                <div>
                  <h4 style="font-size: 14px; font-weight: 700;">Revolut</h4>
                  <p style="font-size: 11.5px; color: #386641; font-weight: 600;">✓ Sample: October 2026 (64 txns)</p>
                </div>
                <span class="account-role-tag">Attached</span>
              </div>

              <div class="statement-row">
                <div>
                  <h4 style="font-size: 14px; font-weight: 700;">Wise</h4>
                  <p style="font-size: 11.5px; color: var(--secondary-text);">Inflows & Transfers</p>
                </div>
                <button class="btn-secondary" style="height: 32px; font-size: 11px; padding: 0 10px;" onclick="showToast('Выписка Wise загружена!')">
                  + Add sample
                </button>
              </div>

              <div class="statement-row">
                <div>
                  <h4 style="font-size: 14px; font-weight: 700;">OTP Bank</h4>
                  <p style="font-size: 11.5px; color: var(--secondary-text);">Work account</p>
                </div>
                <button class="btn-secondary" style="height: 32px; font-size: 11px; padding: 0 10px;" onclick="showToast('Выписка OTP загружена!')">
                  + Add sample
                </button>
              </div>
            </div>

            <div class="glass-card" style="padding: 12px 14px; font-size: 12px; color: var(--secondary-text); margin-top: 6px;">
              🛡️ <strong>You stay in control:</strong> Vela analyzes transactions locally to find subscriptions and cannot move your money.
            </div>

            <div style="margin-top: auto; padding-top: 16px;">
              <button class="btn-primary" style="width: 100%; height: 50px;" onclick="nextOnboardingStep()">
                Analyze Statements (1 attached) →
              </button>
            </div>
          </div>

          <!-- SCREEN 9: YOUR FINANCIAL PICTURE (REVIEW & CONFIRM) -->
          <div class="onboarding-screen" id="obScreen9">
            <div>
              <p class="eyebrow">Review & Confirm</p>
              <h1 class="ob-hero-title">Here's what Vela found.</h1>
              <p class="ob-subtitle">Based on your October Revolut statement.</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 6px;">
              <div class="glass-card" style="padding: 12px; text-align: center;">
                <p class="eyebrow" style="justify-content: center;">Observed spending</p>
                <p style="font-size: 24px; font-weight: 800; color: var(--primary-text); margin-top: 2px;">€520</p>
                <p style="font-size: 10px; color: var(--secondary-text);">in October</p>
              </div>

              <div class="glass-card" style="padding: 12px; text-align: center;">
                <p class="eyebrow" style="justify-content: center;">Subscriptions</p>
                <p style="font-size: 24px; font-weight: 800; color: #b45309; margin-top: 2px;">€30</p>
                <p style="font-size: 10px; color: var(--secondary-text);">2 recurring bills</p>
              </div>
            </div>

            <!-- Impact-Based Clarifications -->
            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
              <div class="confirm-card">
                <p style="font-size: 12.5px; font-weight: 700;">
                  Is the €300 transfer from Wise between your own accounts?
                </p>
                <div class="confirm-options">
                  <button class="confirm-btn active" onclick="setConfirm(this)">Yes, internal</button>
                  <button class="confirm-btn" onclick="setConfirm(this)">No</button>
                  <button class="confirm-btn" onclick="setConfirm(this)">Not sure</button>
                </div>
              </div>

              <div class="confirm-card">
                <p style="font-size: 12.5px; font-weight: 700;">
                  Is this €15 recurring subscription still something you use?
                </p>
                <div class="confirm-options">
                  <button class="confirm-btn" onclick="setConfirm(this)">Yes</button>
                  <button class="confirm-btn active" onclick="setConfirm(this)">Cancel candidate</button>
                  <button class="confirm-btn" onclick="setConfirm(this)">Not sure</button>
                </div>
              </div>
            </div>

            <div style="margin-top: auto; padding-top: 14px;">
              <button class="btn-primary" style="width: 100%; height: 50px;" onclick="nextOnboardingStep()">
                Confirm & See My Next Step →
              </button>
            </div>
          </div>

          <!-- SCREEN 10: WELCOME TO TODAY (FIRST NEXT STEP) -->
          <div class="onboarding-screen" id="obScreen10">
            <div>
              <p class="eyebrow">Onboarding Complete</p>
              <h1 class="ob-hero-title">Your financial picture is ready!</h1>
              <p class="ob-subtitle">Vela prepared your personalized action plan.</p>
            </div>

            <div class="glass-card" style="background: rgba(255, 255, 255, 0.7); border-color: rgba(56, 102, 65, 0.35); padding: 18px; display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span class="eyebrow">Action Ready • State A</span>
                <span class="priority-badge" style="background: #386641; color: #fff;">Priority</span>
              </div>
              
              <h2 style="font-size: 18px; font-weight: 800; color: var(--primary-text);">
                Put €40 into safety cushion
              </h2>
              
              <p style="font-size: 13px; color: var(--secondary-text); line-height: 19px;">
                Leaves <strong style="color: var(--primary-text);">€60</strong> safe to spend. Increases cushion buffer to <strong style="color: var(--primary-text);">12%</strong> of upcoming volatility.
              </p>
            </div>

            <div class="glass-card" style="padding: 14px; font-size: 12.5px; display: flex; flex-direction: column; gap: 6px;">
              <div class="ledger-row">
                <span style="color: var(--secondary-text);">Verified Accounts</span>
                <span style="font-weight: 700;">Revolut, Wise, OTP</span>
              </div>
              <div class="ledger-row">
                <span style="color: var(--secondary-text);">Monthly Cashflow</span>
                <span style="font-weight: 700;">€1,500 In / €900 Out</span>
              </div>
            </div>

            <div style="margin-top: auto; padding-top: 16px;">
              <button class="btn-primary" style="width: 100%; height: 50px; background: #386641; color: #fff; font-size: 15px;" onclick="enterMainDashboard()">
                Enter Vela Dashboard →
              </button>
            </div>
          </div>

        </div>
      </div>


      <!-- =========================================================
           VIEW 2: MAIN DASHBOARD APP (TODAY / MY PLAN / ASSISTANT)
           ========================================================= -->
      <div class="app-view active" id="viewMainApp">
        
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

          <!-- TAB 2: MY PLAN (RICH FINANCIAL ANALYTICS & CHARTS) -->
          <div class="tab-content" id="tabPlan">
            
            <!-- Safety Cushion Goal Card with Gauge -->
            <section class="glass-card" style="display: flex; flex-direction: column; gap: 14px;">
              <div class="card-top">
                <div>
                  <div class="eyebrow">{sparkle_svg} <span>Emergency Runway</span></div>
                  <h2 class="card-title">Safety Cushion Goal</h2>
                </div>
                <span class="priority-badge">€500 Target</span>
              </div>

              <!-- Visual Arc / Progress Indicator -->
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 6px 0;">
                <div style="flex: 1;">
                  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                    <span style="font-size: 24px; font-weight: 800; color: #386641;" id="planCurrentCushion">€100.00</span>
                    <span style="font-size: 12px; font-weight: 700; color: var(--secondary-text);">20% reached</span>
                  </div>
                  <div style="width: 100%; height: 9px; background: rgba(0,0,0,0.06); border-radius: 8px; overflow: hidden;">
                    <div id="planProgressFill" style="height: 100%; width: 20%; background: linear-gradient(90deg, #52b788, #386641); border-radius: 8px; transition: width 0.5s ease;"></div>
                  </div>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 10px;">
                <div style="text-align: center;">
                  <p style="font-size: 10px; font-weight: 700; color: var(--secondary-text); text-transform: uppercase;">Runway</p>
                  <p style="font-size: 14px; font-weight: 700; color: var(--primary-text); margin-top: 2px;">4.2 Days</p>
                </div>
                <div style="text-align: center;">
                  <p style="font-size: 10px; font-weight: 700; color: var(--secondary-text); text-transform: uppercase;">Volatility buffer</p>
                  <p style="font-size: 14px; font-weight: 700; color: #386641; margin-top: 2px;">12% Safe</p>
                </div>
                <div style="text-align: center;">
                  <p style="font-size: 10px; font-weight: 700; color: var(--secondary-text); text-transform: uppercase;">Est. Completion</p>
                  <p style="font-size: 14px; font-weight: 700; color: var(--primary-text); margin-top: 2px;">Feb 2027</p>
                </div>
              </div>
            </section>

            <!-- Monthly Cashflow Analytics (Bar Chart) -->
            <section class="glass-card" style="display: flex; flex-direction: column; gap: 12px;">
              <div class="card-top">
                <div>
                  <div class="eyebrow"><span>Monthly Cash Flow</span></div>
                  <h3 style="font-size: 16px; font-weight: 700; margin-top: 2px;">Inflows vs. Outflows</h3>
                </div>
                <span class="confirmed-badge">€1,500 Total In</span>
              </div>

              <div class="bar-chart-row">
                <div class="chart-bar-group">
                  <span class="chart-bar-val">€1,500</span>
                  <div class="chart-bar inflow" style="height: 100%;"></div>
                  <span class="chart-bar-label">Income</span>
                </div>
                <div class="chart-bar-group">
                  <span class="chart-bar-val">€800</span>
                  <div class="chart-bar essential" style="height: 53%;"></div>
                  <span class="chart-bar-label">Essentials</span>
                </div>
                <div class="chart-bar-group">
                  <span class="chart-bar-val">€600</span>
                  <div class="chart-bar discretionary" style="height: 40%;"></div>
                  <span class="chart-bar-label">Spend</span>
                </div>
                <div class="chart-bar-group">
                  <span class="chart-bar-val" id="chartCushionVal">€100</span>
                  <div class="chart-bar cushion" id="chartCushionBar" style="height: 15%;"></div>
                  <span class="chart-bar-label">Cushion</span>
                </div>
              </div>

              <p style="font-size: 11.5px; color: var(--secondary-text); margin-top: 2px;">
                Net cash flow margin: <strong style="color: #386641;">+€100.00/mo</strong> after all fixed essentials and variable spending.
              </p>
            </section>

            <!-- Spending Breakdown by Category (Donut Chart) -->
            <section class="glass-card" style="display: flex; flex-direction: column; gap: 12px;">
              <div class="card-top">
                <div>
                  <div class="eyebrow"><span>Breakdown</span></div>
                  <h3 style="font-size: 16px; font-weight: 700; margin-top: 2px;">Observed Spending Mix</h3>
                </div>
                <span style="font-size: 11px; font-weight: 700; color: var(--secondary-text);">October Data</span>
              </div>

              <div class="donut-layout">
                <!-- SVG Donut Chart -->
                <svg width="90" height="90" viewBox="0 0 36 36" style="transform: rotate(-90deg); shrink: 0;">
                  <!-- Background circle -->
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="4.5" />
                  <!-- Rent: 54% -->
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#2d6a4f" stroke-width="4.5" stroke-dasharray="54 46" stroke-dashoffset="0" />
                  <!-- Food & Living: 30% -->
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#52b788" stroke-width="4.5" stroke-dasharray="30 70" stroke-dashoffset="-54" />
                  <!-- Energy: 8% -->
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#f4a261" stroke-width="4.5" stroke-dasharray="8 92" stroke-dashoffset="-84" />
                  <!-- Telecom: 5% -->
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#0096c7" stroke-width="4.5" stroke-dasharray="5 95" stroke-dashoffset="-92" />
                  <!-- Subscriptions: 3% -->
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#e76f51" stroke-width="4.5" stroke-dasharray="3 97" stroke-dashoffset="-97" />
                </svg>

                <!-- Legend -->
                <div class="donut-legend">
                  <div class="legend-item">
                    <div style="display: flex; align-items: center;">
                      <span class="legend-color" style="background: #2d6a4f;"></span>
                      <span>Rent & Housing</span>
                    </div>
                    <span style="font-weight: 700;">54% (€650)</span>
                  </div>
                  <div class="legend-item">
                    <div style="display: flex; align-items: center;">
                      <span class="legend-color" style="background: #52b788;"></span>
                      <span>Living & Food</span>
                    </div>
                    <span style="font-weight: 700;">30% (€360)</span>
                  </div>
                  <div class="legend-item">
                    <div style="display: flex; align-items: center;">
                      <span class="legend-color" style="background: #f4a261;"></span>
                      <span>Energy Grid</span>
                    </div>
                    <span style="font-weight: 700;">8% (€95)</span>
                  </div>
                  <div class="legend-item">
                    <div style="display: flex; align-items: center;">
                      <span class="legend-color" style="background: #0096c7;"></span>
                      <span>Fiber Optic</span>
                    </div>
                    <span style="font-weight: 700;">5% (€55)</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Interactive Savings Simulator -->
            <section class="glass-card" style="display: flex; flex-direction: column; gap: 10px;">
              <div class="eyebrow"><span>Interactive Simulator</span></div>
              <h3 style="font-size: 15px; font-weight: 700;">What if you save more?</h3>
              <p style="font-size: 12px; color: var(--secondary-text);">
                Move the slider to see how additional monthly cushion allocations speed up your runway:
              </p>
              
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 4px;">
                <span style="font-size: 13px; font-weight: 600;">Monthly Deposit:</span>
                <span style="font-size: 16px; font-weight: 800; color: #386641;" id="simDepositVal">+€40 / mo</span>
              </div>
              
              <input type="range" min="10" max="150" step="10" value="40" style="width: 100%; accent-color: #386641; cursor: pointer;" oninput="updateSimulator(this.value)">

              <div style="background: rgba(255, 255, 255, 0.6); border-radius: 10px; padding: 10px; font-size: 12px; display: flex; justify-content: space-between;">
                <span style="color: var(--secondary-text);">Goal reached in:</span>
                <strong style="color: #386641;" id="simTimeVal">10 Months (Dec 2026)</strong>
              </div>
            </section>

          </div>

          <!-- TAB 3: ASSISTANT (Vela AI Chat) -->
          <div class="tab-content" id="tabAssistant">
            <section class="glass-card" style="display: flex; flex-direction: column; gap: 12px; min-height: 320px;">
              <div class="eyebrow">{assistant_svg} <span>Vela Financial Assistant</span></div>
              
              <div id="chatMessages" style="display: flex; flex-direction: column; gap: 10px; margin-top: 4px;">
                <div class="chat-bubble bot">
                  Привет, Alex! Я проанализировал твои выписки Revolut и счета Wise. Твой баланс <strong>€1,000</strong>, а свободная безопасная сумма — <strong>€100</strong>. Чем могу помочь?
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
      </div>

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
      currentView: 'app', // 'onboarding' or 'app'
      onboardingStep: 1,
      totalOnboardingSteps: 10,
      activeTab: 'Today',
      isReserved: false,
      totalBalance: 1000.0,
      protectedMoney: 100.0,
      availableSpend: 100.0,
      essentialExpenses: 800.0,
      userName: 'Alex',
    }};

    // Initialize Onboarding Progress Bar Segments
    function initOnboardingProgress() {{
      const container = document.getElementById('onboardingProgressBar');
      container.innerHTML = '';
      for (let i = 1; i <= state.totalOnboardingSteps; i++) {{
        const seg = document.createElement('div');
        seg.className = 'progress-segment' + (i <= state.onboardingStep ? ' active' : '');
        seg.id = 'obProgSeg' + i;
        container.appendChild(seg);
      }}
    }}
    initOnboardingProgress();

    // Toggle Main Flow View: Onboarding vs App
    function toggleMainFlow(view) {{
      state.currentView = view;
      const vOnboarding = document.getElementById('viewOnboarding');
      const vApp = document.getElementById('viewMainApp');
      const btnOnboarding = document.getElementById('btnToggleOnboarding');
      const btnApp = document.getElementById('btnToggleApp');

      if (view === 'onboarding') {{
        vOnboarding.classList.add('active');
        vApp.classList.remove('active');
        btnOnboarding.classList.add('active');
        btnApp.classList.remove('active');
      }} else {{
        vApp.classList.add('active');
        vOnboarding.classList.remove('active');
        btnApp.classList.add('active');
        btnOnboarding.classList.remove('active');
      }}
    }}

    // Onboarding Step Navigation
    function showOnboardingStep(step) {{
      state.onboardingStep = Math.max(1, Math.min(step, state.totalOnboardingSteps));
      
      // Update screen visibility
      for (let i = 1; i <= state.totalOnboardingSteps; i++) {{
        const scr = document.getElementById('obScreen' + i);
        if (scr) {{
          scr.className = 'onboarding-screen' + (i === state.onboardingStep ? ' active' : '');
        }}
        const seg = document.getElementById('obProgSeg' + i);
        if (seg) {{
          seg.className = 'progress-segment' + (i <= state.onboardingStep ? ' active' : '');
        }}
      }}

      // Update label
      document.getElementById('stepNumberLabel').innerText = `Step ${{state.onboardingStep}} of ${{state.totalOnboardingSteps}}`;
      
      // Scroll to top of onboarding container
      document.getElementById('viewOnboarding').scrollTop = 0;
    }}

    function nextOnboardingStep() {{
      if (state.onboardingStep < state.totalOnboardingSteps) {{
        showOnboardingStep(state.onboardingStep + 1);
      }}
    }}

    function prevOnboardingStep() {{
      if (state.onboardingStep > 1) {{
        showOnboardingStep(state.onboardingStep - 1);
      }} else {{
        toggleMainFlow('app');
      }}
    }}

    function skipToMainApp() {{
      toggleMainFlow('app');
      showToast('Переход к главному экрану Vela');
    }}

    function enterMainDashboard() {{
      toggleMainFlow('app');
      switchTab('Today');
      showToast('Добро пожаловать в Vela!');
      expandIsland('Vela • Active Profile');
    }}

    function selectConcern(el, concernKey) {{
      document.querySelectorAll('#concernOptionsList .choice-card').forEach(c => c.classList.remove('selected'));
      el.classList.add('selected');
    }}

    function setIncomePattern(btn, pattern) {{
      btn.parentElement.querySelectorAll('button').forEach(b => {{
        b.style.background = 'rgba(255, 255, 255, 0.45)';
        b.style.fontWeight = '600';
        b.style.borderColor = 'rgba(255, 255, 255, 0.85)';
      }});
      btn.style.background = 'rgba(255, 255, 255, 0.9)';
      btn.style.fontWeight = '700';
      btn.style.borderColor = '#386641';
    }}

    function setConfirm(btn) {{
      btn.parentElement.querySelectorAll('.confirm-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }}

    // Real-time Clock
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

    // Reserve €40 Action
    function handleReserve() {{
      if (state.isReserved) return;
      
      state.isReserved = true;
      state.protectedMoney += 40.0;
      state.availableSpend -= 40.0;
      
      document.getElementById('protectedMoneyVal').innerText = '€' + state.protectedMoney.toFixed(2);
      document.getElementById('availableSpendVal').innerText = '€' + state.availableSpend.toFixed(2);
      
      const btn = document.getElementById('btnReserve');
      btn.innerText = 'Reserved ✓';
      btn.classList.add('completed');
      
      // Update Plan tab
      document.getElementById('planCurrentCushion').innerText = '€' + state.protectedMoney.toFixed(2);
      const pct = Math.round((state.protectedMoney / 500) * 100);
      document.getElementById('planProgressFill').style.width = pct + '%';
      
      // Update Bar Chart
      document.getElementById('chartCushionVal').innerText = '€' + state.protectedMoney.toFixed(0);
      document.getElementById('chartCushionBar').style.height = (state.protectedMoney / 1500 * 100 * 1.5) + '%';

      showToast('€40 успешно добавлены в подушку!');
      expandIsland('€40 Added to Cushion');
    }}

    // Simulator Update
    function updateSimulator(val) {{
      const num = parseInt(val);
      document.getElementById('simDepositVal').innerText = `+€${{num}} / mo`;
      const needed = 500 - state.protectedMoney;
      const months = Math.max(1, Math.ceil(needed / num));
      document.getElementById('simTimeVal').innerText = `${{months}} Months (${{months <= 3 ? 'Q1 2027' : 'Q2 2027'}})`;
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

    // Dynamic Island
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
              <span style="font-size: 14px; font-weight: 600;">Restart Onboarding</span>
              <button class="btn-secondary" style="height: 32px; font-size: 11px; padding: 0 10px;" onclick="closeSheet(); toggleMainFlow('onboarding'); showOnboardingStep(1);">Launch</button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 14px; font-weight: 600;">Haptic & Sounds</span>
              <input type="checkbox" checked style="width: 20px; height: 20px;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 14px; font-weight: 600;">Base Currency</span>
              <span style="font-size: 14px; font-weight: 700; color: #386641;">EUR (€)</span>
            </div>
          </div>
          <button class="btn-primary" style="width: 100%;" onclick="closeSheet()">Done</button>
        `;
      }}
      overlay.classList.add('open');
    }}

    function closeSheet() {{
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
      showToast('Доход €' + val.toFixed(2) + ' добавлен!');
      expandIsland('+€' + val.toFixed(2) + ' Inflow');
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
      
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.innerText = promptText;
      chatBox.appendChild(userBubble);
      
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

print('Generated full index.html successfully, size:', len(html_content))
