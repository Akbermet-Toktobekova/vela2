import React, { useState } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { PIProvider, usePI } from './context/PIContext';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { TodayView } from './components/dashboard/TodayView';
import { MyPlanView } from './components/dashboard/MyPlanView';
import { AssistantView } from './components/dashboard/AssistantView';
import { SettingsModal } from './components/modals/SettingsModal';

const NAV_ITEMS = [
  { id: 'today', path: '/today', label: 'TODAY', icon: './assets/18d29.svg' },
  { id: 'my-plan', path: '/my-plan', label: 'MY PLAN', icon: './assets/ce19a.svg' },
  { id: 'assistant', path: '/assistant', label: 'ASSISTANT', icon: './assets/1df7b.svg' },
];

const VelaShell: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    snapshot,
    isLoading,
    toastMessage,
    islandAlert,
    setOnboardingStep,
  } = usePI();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [phoneFrameMode, setPhoneFrameMode] = useState(true);

  const isOnboardingRoute = location.pathname.startsWith('/onboarding');

  if (isLoading) {
    return (
      <div className="app-shell flex min-h-dvh items-center justify-center p-6 text-center">
        <div className="glass-card rounded-[24px] p-6 max-w-xs w-full">
          <p className="text-sm font-bold text-[#272e23]">Loading Vela PI Database…</p>
          <p className="mt-1 text-xs text-[#74766d]">
            Restoring your accounts, statements, and financial snapshot.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-dvh w-full transition-colors ${
        phoneFrameMode
          ? 'md:bg-[#1c2119] md:py-6 md:px-4 md:flex md:flex-col md:items-center md:justify-center'
          : ''
      }`}
    >
      {/* Desktop Top Mode Bar (Only visible on wider screens) */}
      <div className="hidden md:flex items-center justify-between gap-4 mb-3 w-full max-w-[412px] px-2 text-xs text-white/80">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#6a994e]" />
          <span className="font-semibold text-white">
            Vela Interactive Prototype ({snapshot.isDemoMode ? 'Demo: Alex' : 'Custom Profile'})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              if (isOnboardingRoute) {
                navigate('/today');
              } else {
                setOnboardingStep(snapshot.onboarding.currentStep || 1);
                navigate('/onboarding');
              }
            }}
            className="rounded-full bg-white/15 hover:bg-white/25 px-2.5 py-1 text-[11px] font-semibold text-white transition"
          >
            {isOnboardingRoute ? 'Exit Onboarding' : '10-Step Onboarding'}
          </button>
          <button
            type="button"
            onClick={() => setPhoneFrameMode((v) => !v)}
            className="rounded-full bg-white/15 hover:bg-white/25 px-2.5 py-1 text-[11px] font-semibold text-white transition"
          >
            {phoneFrameMode ? 'Full Screen' : 'iPhone Frame'}
          </button>
        </div>
      </div>

      {/* Main Mobile Container / iPhone Shell */}
      <div
        className={`app-shell w-full text-[#272e23] ${
          phoneFrameMode
            ? 'md:max-w-[412px] md:min-h-[852px] md:max-h-[880px] md:rounded-[48px] md:border-[10px] md:border-[#2a3027] md:shadow-2xl md:overflow-y-auto relative'
            : 'min-h-dvh'
        }`}
      >
        {/* Dynamic Island Notification Pill */}
        {islandAlert && (
          <div className="sticky top-2 z-50 mx-auto flex w-fit max-w-[90%] items-center gap-2 rounded-full bg-[#1b2018] px-4 py-1.5 text-[11px] font-semibold text-white shadow-lg">
            <span className="h-2 w-2 rounded-full bg-[#a7c957] animate-pulse" />
            <span>{islandAlert}</span>
          </div>
        )}

        {/* Top Sticky Header */}
        <header className="top-bar sticky top-0 z-20 backdrop-blur-xl">
          <div className="mx-auto flex h-[57px] w-full max-w-[422px] items-center justify-between px-5">
            <button
              type="button"
              onClick={() => navigate('/today')}
              className="flex items-center gap-2.5 text-left"
            >
              <span className="icon-tile flex h-9 w-9 items-center justify-center rounded-full">
                <img
                  src="./assets/b436f.svg"
                  alt=""
                  aria-hidden="true"
                  className="glass-icon h-[18px] w-[18px]"
                />
              </span>
              <div>
                <span className="block text-[18px] leading-5 font-bold tracking-[-0.45px] text-[#272e23]">
                  Vela
                </span>
                <span className="block text-[9px] font-semibold uppercase tracking-wider text-[#386641]">
                  {snapshot.isDemoMode ? 'Demo · 4 Accounts' : 'Personal Profile'}
                </span>
              </div>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  if (isOnboardingRoute) {
                    navigate('/today');
                  } else {
                    navigate('/onboarding');
                  }
                }}
                className="secondary-action rounded-full px-2.5 py-1 text-[10px] font-semibold text-[#272e23]"
              >
                {isOnboardingRoute ? 'Dashboard' : 'Onboarding'}
              </button>

              <button
                type="button"
                aria-label="Open Settings & Account Management"
                onClick={() => setSettingsOpen(true)}
                className="icon-button flex h-9 w-9 items-center justify-center rounded-full bg-white/45 border border-white/80"
              >
                <img
                  src="./assets/ff037.svg"
                  alt=""
                  aria-hidden="true"
                  className="glass-icon glass-icon-muted h-5 w-5"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="mx-auto mt-2 max-w-[382px] px-4">
            <div className="rounded-2xl bg-[#272e23] px-3.5 py-2.5 text-[11.5px] font-medium text-white shadow-md flex items-center justify-between gap-2">
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Main View Content */}
        <main className="mx-auto w-full max-w-[422px] px-4 pt-3 pb-28">
          <Routes>
            <Route
              path="/"
              element={
                snapshot.onboarding.status === 'in_progress' &&
                snapshot.accountSummaries.length === 0 ? (
                  <Navigate to="/onboarding" replace />
                ) : (
                  <Navigate to="/today" replace />
                )
              }
            />
            <Route
              path="/onboarding"
              element={
                <OnboardingFlow onFinishToToday={() => navigate('/today')} />
              }
            />
            <Route path="/today" element={<TodayView />} />
            <Route path="/my-plan" element={<MyPlanView />} />
            <Route path="/assistant" element={<AssistantView />} />
            <Route path="*" element={<Navigate to="/today" replace />} />
          </Routes>
        </main>

        {/* Bottom Soft Glass Navigation Bar (Hidden during full Onboarding flow) */}
        {!isOnboardingRoute && (
          <nav
            aria-label="Primary navigation"
            className="glass-nav fixed bottom-4 left-1/2 z-30 -translate-x-1/2 p-1.5"
          >
            <ul className="grid grid-cols-3 gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.id} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => navigate(item.path)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`nav-item w-full ${isActive ? 'nav-item-active' : ''}`}
                    >
                      <img
                        src={item.icon}
                        alt=""
                        aria-hidden="true"
                        className={`glass-icon h-[18px] w-[18px] shrink-0 ${
                          isActive ? '' : 'glass-icon-muted'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Settings & PI Database Modal */}
        {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
      </div>
    </div>
  );
};

export function App() {
  return (
    <PIProvider>
      <HashRouter>
        <VelaShell />
      </HashRouter>
    </PIProvider>
  );
}

export default App;
