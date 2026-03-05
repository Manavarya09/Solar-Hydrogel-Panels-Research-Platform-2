import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ControlPanel from './components/dashboard/ControlPanel';
import SystemArchitecture from './components/dashboard/SystemArchitecture';
import NightAbsorption from './components/simulation/NightAbsorption';
import DayRelease from './components/simulation/DayRelease';
import MaterialScience from './components/dashboard/MaterialScience';
import PerformanceDashboard from './components/dashboard/PerformanceDashboard';
import ImplementationRoadmap from './components/dashboard/ImplementationRoadmap';
import Applications from './components/dashboard/Applications';
import PrototypeViewer from './components/dashboard/PrototypeViewer';

type Section = 'overview' | 'architecture' | 'night' | 'day' | 'materials' | 'performance' | 'applications' | 'prototype' | 'roadmap';

const navItems: { id: Section; label: string; short: string }[] = [
  { id: 'overview', label: 'OVERVIEW', short: 'OVW' },
  { id: 'architecture', label: 'SYSTEM ARCHITECTURE', short: 'SYS' },
  { id: 'night', label: 'NIGHT ABSORPTION', short: 'NGT' },
  { id: 'day', label: 'DAY RELEASE', short: 'DAY' },
  { id: 'materials', label: 'MATERIALS ENG.', short: 'MAT' },
  { id: 'performance', label: 'PERFORMANCE', short: 'PER' },
  { id: 'applications', label: 'APPLICATIONS', short: 'APP' },
  { id: 'prototype', label: 'PROTOTYPE', short: 'PRO' },
  { id: 'roadmap', label: 'ROADMAP', short: 'MAP' },
];

function App() {
  const [active, setActive] = useState<Section>('overview');

  const renderSection = () => {
    switch (active) {
      case 'overview': return <ControlPanel />;
      case 'architecture': return <SystemArchitecture />;
      case 'night': return <NightAbsorption />;
      case 'day': return <DayRelease />;
      case 'materials': return <MaterialScience />;
      case 'performance': return <PerformanceDashboard />;
      case 'applications': return <Applications />;
      case 'prototype': return <PrototypeViewer />;
      case 'roadmap': return <ImplementationRoadmap />;
      default: return <ControlPanel />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen texture-carbon"
      style={{ background: '#040d1a' }}>

      {/* Top header bar */}
      <header
        className="relative px-4 py-3 flex items-center justify-between"
        style={{
          background: 'linear-gradient(90deg, #040d1a 0%, #071428 40%, #040d1a 100%)',
          borderBottom: '1px solid rgba(56,189,248,0.15)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.6)',
        }}
      >
        {/* Left: Brand */}
        <div className="flex items-center gap-4">
          {/* Logo mark */}
          <div className="relative flex-shrink-0">
            <div
              className="w-10 h-10 rounded-sm flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #1a3d7c, #071428)',
                border: '1px solid rgba(56,189,248,0.3)',
                boxShadow: '0 0 12px rgba(56,189,248,0.15)',
              }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22">
                {/* Sun rays */}
                <circle cx="12" cy="8" r="4" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                {[0, 45, 90, 135].map(angle => (
                  <line key={angle}
                    x1={12 + 5 * Math.cos(angle * Math.PI / 180)}
                    y1={8 + 5 * Math.sin(angle * Math.PI / 180)}
                    x2={12 + 7 * Math.cos(angle * Math.PI / 180)}
                    y2={8 + 7 * Math.sin(angle * Math.PI / 180)}
                    stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                ))}
                {/* Water drop */}
                <path d="M12 14 Q10 17 12 19 Q14 17 12 14Z" fill="#38bdf8" opacity="0.9" />
                {/* Panel line */}
                <line x1="6" y1="22" x2="18" y2="22" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div>
            <div className="font-engineering text-sm text-white tracking-[0.15em]">
              SOLAR HYDROGEL PANEL
            </div>
            <div className="font-mono text-[9px] text-slate-500 tracking-wider mt-0.5">
              ATMOSPHERIC WATER HARVESTING — CONTROL INTERFACE v4.2
            </div>
          </div>
        </div>

        {/* Center: Status indicators */}
        <div className="hidden lg:flex items-center gap-6">
          {[
            { label: 'SYSTEM', color: '#10b981', status: 'ONLINE' },
            { label: 'SOLAR', color: '#f59e0b', status: 'ACTIVE' },
            { label: 'HYDROGEL', color: '#38bdf8', status: 'CHARGED' },
            { label: 'OUTPUT', color: '#38bdf8', status: '3.2 L/m²' },
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center gap-0.5">
              <div
                className="font-mono text-xs font-bold"
                style={{ color: item.color, textShadow: `0 0 8px ${item.color}50` }}
              >
                {item.status}
              </div>
              <div className="engraved-label text-[9px]">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Right: System info */}
        <div className="flex items-center gap-3">
          <span className="test-css-applied">CSS OK</span>
          <div
            className="px-3 py-1.5 rounded text-center"
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(56,189,248,0.15)',
            }}
          >
            <div className="font-mono text-[10px] text-sky-400">SITE: DESERT ALPHA</div>
            <div className="font-mono text-[9px] text-slate-600">23.5°N / 35.2°E</div>
          </div>
          <div
            className="px-3 py-1.5 rounded text-center"
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(245,158,11,0.15)',
            }}
          >
            <div className="font-mono text-[10px] text-amber-400">REV 4.2</div>
            <div className="font-mono text-[9px] text-slate-600">PROTOTYPE</div>
          </div>
        </div>
      </header>

      {/* Navigation tabs - full width */}
      <nav
        className="flex overflow-x-auto w-full"
        style={{
          background: 'linear-gradient(180deg, #0a1628 0%, #071428 100%)',
          borderBottom: '1px solid rgba(56,189,248,0.12)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`nav-tab flex-shrink-0 ${active === item.id ? 'active' : ''}`}
          >
            <span className="hidden xl:inline">{item.label}</span>
            <span className="xl:hidden">{item.short}</span>
            {active === item.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
        
        {/* Right side decorative tab group */}
        <div className="ml-auto flex items-center px-3 gap-2 border-l border-white/5">
          <div className="engraved-label text-[9px]">FIELD OPS MODE</div>
          <div className="w-2 h-2 rounded-full" style={{ background: '#10b981', boxShadow: '0 0 4px #10b981' }} />
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 w-full">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer status bar */}
      <footer
        className="w-full mt-auto border-t"
        style={{
          background: 'linear-gradient(90deg, #040d1a 0%, #071428 50%, #040d1a 100%)',
          borderTopColor: 'rgba(56,189,248,0.1)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 py-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[9px] text-slate-600">SHP-AWH-CTRL v4.2.1</span>
              <span className="font-mono text-[9px] text-slate-700">|</span>
              <span className="font-mono text-[9px] text-green-700">SYSTEM NOMINAL</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[9px] text-slate-600">PATENT PENDING</span>
              <span className="font-mono text-[9px] text-slate-700">|</span>
              <span className="font-mono text-[9px] text-slate-600">2026 SOLAR HYDROGEL PANEL PROJECT</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
