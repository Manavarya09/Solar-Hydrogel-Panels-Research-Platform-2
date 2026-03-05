import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Panel, SectionHeader } from '../ui/Panel';
import { LED } from '../ui/LED';
import { Gauge } from '../ui/Gauge';
import { DigitalDisplay, DataReadout } from '../ui/DigitalDisplay';
import { Toggle, PhysicalButton } from '../ui/Toggle';
import { Dial } from '../ui/Dial';

interface MetricData {
  waterOutput: number;
  solarIntensity: number;
  humidity: number;
  reservoirLevel: number;
  efficiency: number;
  temperature: number;
}

const ControlPanel: React.FC = () => {
  const [systemOn, setSystemOn] = useState(true);
  const [nightMode, setNightMode] = useState(false);
  const [metrics, setMetrics] = useState<MetricData>({
    waterOutput: 3.2,
    solarIntensity: 78,
    humidity: 62,
    reservoirLevel: 71,
    efficiency: 84,
    temperature: 41,
  });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      if (systemOn) {
        setMetrics(prev => ({
          waterOutput: Math.max(0.1, Math.min(5, prev.waterOutput + (Math.random() - 0.5) * 0.2)),
          solarIntensity: Math.max(0, Math.min(100, prev.solarIntensity + (Math.random() - 0.5) * 3)),
          humidity: Math.max(20, Math.min(95, prev.humidity + (Math.random() - 0.5) * 2)),
          reservoirLevel: Math.min(100, prev.reservoirLevel + 0.05),
          efficiency: Math.max(60, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2)),
          temperature: Math.max(20, Math.min(65, prev.temperature + (Math.random() - 0.5) * 1)),
        }));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [systemOn]);

  return (
    <div className="space-y-4">
      {/* System Status Bar */}
      <div
        className="flex items-center justify-between px-4 py-2 rounded"
        style={{
          background: 'linear-gradient(90deg, #071428 0%, #0d2040 50%, #071428 100%)',
          borderTop: '1px solid rgba(56,189,248,0.2)',
          borderBottom: '1px solid rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex items-center gap-6">
          <LED color={systemOn ? 'green' : 'red'} pulsing={systemOn} label="SYSTEM ONLINE" />
          <LED color={nightMode ? 'blue' : 'amber'} pulsing label={nightMode ? 'NIGHT CYCLE' : 'DAY CYCLE'} />
          <LED color="green" pulsing={false} label="SOLAR READY" />
          <LED color={metrics.reservoirLevel > 90 ? 'amber' : 'green'} label="RESERVOIR" />
        </div>
        <div className="flex items-center gap-4">
          <div className="digital-display text-sm px-3 py-1">
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </div>
          <div className="digital-display amber text-sm px-3 py-1">
            LAT: 23.5°N
          </div>
          <div className="digital-display blue text-sm px-3 py-1">
            ALT: 428M
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div
        className="overflow-hidden py-1 px-2"
        style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(56,189,248,0.1)', borderBottom: '1px solid rgba(56,189,248,0.1)' }}
      >
        <div className="ticker-text font-mono text-[10px] text-slate-500">
          &nbsp;&nbsp;&nbsp;&nbsp;SOLAR HYDROGEL PANEL — ATMOSPHERIC WATER HARVESTING SYSTEM &nbsp;&bull;&nbsp;
          PROTOTYPE REV-4.2 &nbsp;&bull;&nbsp; FIELD OPERATION: DESERT SITE ALPHA &nbsp;&bull;&nbsp;
          PATENT PENDING — HYDROGEL-MOF COMPOSITE MATRIX &nbsp;&bull;&nbsp;
          DAILY YIELD: {metrics.waterOutput.toFixed(1)} L/m² &nbsp;&bull;&nbsp;
          EFFICIENCY: {metrics.efficiency.toFixed(0)}% &nbsp;&bull;&nbsp;
          CO2 OFFSET: 2.4 KG/DAY &nbsp;&bull;&nbsp; SYSTEM STATUS: OPTIMAL &nbsp;&bull;&nbsp;
          SOLAR HYDROGEL PANEL — ATMOSPHERIC WATER HARVESTING SYSTEM &nbsp;&bull;&nbsp;
        </div>
      </div>

      {/* Main Control Grid */}
      <div className="grid grid-cols-12 gap-3">
        {/* Left Control Column */}
        <div className="col-span-3 space-y-3">
          <Panel variant="raised" title="SYSTEM CONTROLS" subtitle="MAIN OPERATIONS" statusColor="green">
            <div className="p-3 space-y-3">
              <Toggle label="HARVEST SYSTEM" defaultOn={systemOn} onChange={setSystemOn} />
              <Toggle label="NIGHT ABSORPTION" defaultOn={nightMode} onChange={setNightMode} />
              <Toggle label="SOLAR HEATING" defaultOn={true} />
              <Toggle label="UV STERILIZE" defaultOn={true} />
              <Toggle label="AUTO-DRAIN" defaultOn={false} />
              <div className="section-divider my-2" />
              <PhysicalButton onClick={() => {}} className="w-full text-center" variant="active-green">
                INITIALIZE CYCLE
              </PhysicalButton>
              <PhysicalButton onClick={() => {}} className="w-full text-center">
                RUN DIAGNOSTICS
              </PhysicalButton>
              <PhysicalButton onClick={() => {}} className="w-full text-center">
                CALIBRATE SENSORS
              </PhysicalButton>
            </div>
          </Panel>

          <Panel variant="carbon" title="SOLAR INTENSITY" statusColor="amber">
            <div className="p-3 flex justify-center">
              <Dial
                label="W/m² × 10"
                value={Math.round(metrics.solarIntensity)}
                min={0}
                max={100}
                color="amber"
                size={90}
              />
            </div>
          </Panel>
        </div>

        {/* Center Main Display */}
        <div className="col-span-6 space-y-3">
          {/* Main Panel Visualization */}
          <Panel variant="inset" className="relative overflow-hidden">
            <div className="relative p-4 min-h-48">
              <div className="diagnostic-line" />
              
              {/* Panel cross-section SVG */}
              <svg viewBox="0 0 600 200" className="w-full" style={{ maxHeight: 200 }}>
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={nightMode ? '#071428' : '#1a3d7c'} />
                    <stop offset="100%" stopColor={nightMode ? '#040d1a' : '#0d2040'} />
                  </linearGradient>
                  <linearGradient id="solarLayer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#92400e" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#78350f" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="hydrogelLayer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0369a1" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.7" />
                  </linearGradient>
                  <linearGradient id="condensLayer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <filter id="glow1">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {/* Sky background */}
                <rect x="0" y="0" width="600" height="200" fill="url(#skyGrad)" />

                {/* Sun / Moon */}
                {nightMode ? (
                  <circle cx="540" cy="30" r="18" fill="#c8d4e0" opacity="0.7"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(200,212,224,0.5))' }} />
                ) : (
                  <circle cx="540" cy="30" r="22" fill="#fbbf24"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.8))' }} />
                )}

                {/* Panel body */}
                {/* Glass top surface */}
                <rect x="60" y="55" width="480" height="18" rx="2" fill="rgba(125,211,252,0.3)"
                  stroke="rgba(56,189,248,0.4)" strokeWidth="1" />
                <text x="300" y="67" textAnchor="middle" fill="rgba(125,211,252,0.7)"
                  style={{ fontFamily: 'Rajdhani', fontSize: 8, letterSpacing: '0.2em' }}>
                  TRANSPARENT GLASS COVER
                </text>

                {/* Solar absorber layer */}
                <rect x="60" y="73" width="480" height="24" rx="0" fill="url(#solarLayer)"
                  stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
                <text x="300" y="88" textAnchor="middle" fill="rgba(251,191,36,0.8)"
                  style={{ fontFamily: 'Rajdhani', fontSize: 8, letterSpacing: '0.2em' }}>
                  SOLAR ABSORBER LAYER — PHOTOTHERMAL COMPOSITE
                </text>

                {/* Hydrogel layer */}
                <rect x="60" y="97" width="480" height="34" fill="url(#hydrogelLayer)"
                  stroke="rgba(14,165,233,0.4)" strokeWidth="1" />
                <text x="300" y="117" textAnchor="middle" fill="rgba(186,230,253,0.9)"
                  style={{ fontFamily: 'Rajdhani', fontSize: 8, letterSpacing: '0.2em' }}>
                  HYDROGEL–MOF ABSORPTION MATRIX
                </text>

                {/* Vapor channel */}
                {[0,1,2,3,4,5].map(i => (
                  <motion.circle key={i}
                    cx={100 + i * 80}
                    cy={110}
                    r={3}
                    fill="rgba(186,230,253,0.6)"
                    animate={{ cy: [110, 85, 60], opacity: [0.8, 0.5, 0] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    style={{ display: systemOn && !nightMode ? 'block' : 'none' }}
                  />
                ))}

                {/* Condensation surface */}
                <rect x="60" y="131" width="480" height="16" fill="url(#condensLayer)"
                  stroke="rgba(148,163,184,0.2)" strokeWidth="1" />
                <text x="300" y="142" textAnchor="middle" fill="rgba(148,163,184,0.7)"
                  style={{ fontFamily: 'Rajdhani', fontSize: 7, letterSpacing: '0.2em' }}>
                  CONDENSATION SURFACE — HYDROPHILIC COATING
                </text>

                {/* Water channel */}
                <rect x="60" y="147" width="480" height="12" rx="0"
                  fill="rgba(14,165,233,0.4)" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                <text x="300" y="156" textAnchor="middle" fill="rgba(56,189,248,0.7)"
                  style={{ fontFamily: 'Rajdhani', fontSize: 7, letterSpacing: '0.2em' }}>
                  MICRO-CHANNEL WATER COLLECTION
                </text>

                {/* Frame */}
                <rect x="60" y="159" width="480" height="20" rx="2"
                  fill="rgba(30,41,59,0.9)" stroke="rgba(71,85,105,0.4)" strokeWidth="1" />
                <text x="300" y="172" textAnchor="middle" fill="rgba(100,116,139,0.7)"
                  style={{ fontFamily: 'Rajdhani', fontSize: 7, letterSpacing: '0.2em' }}>
                  STRUCTURAL FRAME — ANODIZED ALUMINUM
                </text>

                {/* Dimension labels */}
                <line x1="45" y1="55" x2="45" y2="179" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                <line x1="40" y1="55" x2="50" y2="55" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                <line x1="40" y1="179" x2="50" y2="179" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                <text x="35" y="118" textAnchor="middle" fill="rgba(56,189,248,0.5)" transform="rotate(-90, 35, 118)"
                  style={{ fontFamily: 'Share Tech Mono', fontSize: 7 }}>
                  24mm
                </text>

                {/* Solar arrows */}
                {systemOn && !nightMode && [0,1,2].map(i => (
                  <motion.line key={i}
                    x1={160 + i * 120}
                    y1="10"
                    x2={160 + i * 120}
                    y2="52"
                    stroke="#fbbf24"
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                    animate={{ y1: [10, 18, 10], opacity: [0.9, 0.5, 0.9] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                    style={{ filter: 'drop-shadow(0 0 3px #fbbf24)' }}
                  />
                ))}

                {/* Night absorption arrows */}
                {nightMode && [0,1,2,3].map(i => (
                  <motion.circle key={i}
                    cx={100 + i * 120}
                    cy="20"
                    r="4"
                    fill="rgba(125,211,252,0.4)"
                    animate={{ cy: [15, 50, 85], opacity: [0.8, 0.5, 0.2] }}
                    transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
                  />
                ))}
              </svg>
            </div>
          </Panel>

          {/* Gauge Row */}
          <div className="grid grid-cols-4 gap-2">
            <Panel variant="inset" className="p-2">
              <Gauge
                value={metrics.waterOutput}
                min={0}
                max={5}
                unit="L/m²"
                label="WATER OUTPUT"
                color="blue"
                size={110}
                decimals={1}
              />
            </Panel>
            <Panel variant="inset" className="p-2">
              <Gauge
                value={metrics.humidity}
                min={0}
                max={100}
                unit="%RH"
                label="HUMIDITY"
                color="blue"
                size={110}
              />
            </Panel>
            <Panel variant="inset" className="p-2">
              <Gauge
                value={metrics.temperature}
                min={0}
                max={80}
                unit="°C"
                label="TEMPERATURE"
                color="amber"
                size={110}
              />
            </Panel>
            <Panel variant="inset" className="p-2">
              <Gauge
                value={metrics.efficiency}
                min={0}
                max={100}
                unit="%"
                label="EFFICIENCY"
                color="green"
                size={110}
              />
            </Panel>
          </div>
        </div>

        {/* Right Data Column */}
        <div className="col-span-3 space-y-3">
          {/* Reservoir Level */}
          <Panel variant="raised" title="RESERVOIR LEVEL" statusColor="blue">
            <div className="p-3">
              <div className="relative w-full bg-slate-900 rounded overflow-hidden"
                style={{ height: 120, border: '1px solid rgba(56,189,248,0.2)' }}>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 rounded-b"
                  style={{ background: 'linear-gradient(180deg, rgba(56,189,248,0.3) 0%, rgba(14,165,233,0.6) 100%)' }}
                  animate={{ height: `${metrics.reservoirLevel}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                {/* Water surface ripple */}
                <motion.div
                  className="absolute left-0 right-0 h-0.5"
                  style={{
                    bottom: `${metrics.reservoirLevel}%`,
                    background: 'linear-gradient(90deg, transparent, rgba(125,211,252,0.8), transparent)',
                  }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center gap-1">
                  <div className="font-mono text-2xl font-bold text-sky-400"
                    style={{ textShadow: '0 0 10px rgba(56,189,248,0.5)' }}>
                    {metrics.reservoirLevel.toFixed(0)}%
                  </div>
                  <div className="engraved-label text-[10px]">CAPACITY</div>
                </div>
                {/* Scale marks */}
                {[25, 50, 75].map(p => (
                  <div key={p} className="absolute left-0 right-0 flex items-center"
                    style={{ bottom: `${p}%` }}>
                    <div className="w-2 h-px bg-sky-800" />
                    <span className="font-mono text-[8px] text-sky-800 ml-1">{p}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          {/* Data Readouts */}
          <Panel variant="raised" title="LIVE METRICS" statusColor="green">
            <div className="p-3 space-y-2">
              <DataReadout label="WATER YIELD TODAY" value={metrics.waterOutput * 24 * 0.1} unit="LITERS" color="blue" />
              <DataReadout label="SOLAR INTENSITY" value={metrics.solarIntensity * 10} unit="W/m²" color="amber" />
              <DataReadout label="CAPTURE EFFICIENCY" value={metrics.efficiency} unit="%" color="green" />
              <DataReadout label="PANEL TEMPERATURE" value={metrics.temperature} unit="°C" color="amber" />
              <div className="section-divider" />
              <div className="grid grid-cols-2 gap-2">
                <div className="panel-inset rounded p-2 text-center">
                  <div className="font-mono text-xs text-green-400" style={{ textShadow: '0 0 6px #10b981' }}>ACTIVE</div>
                  <div className="engraved-label text-[9px] mt-0.5">HYDROGEL</div>
                </div>
                <div className="panel-inset rounded p-2 text-center">
                  <div className="font-mono text-xs text-sky-400" style={{ textShadow: '0 0 6px #38bdf8' }}>CHARGED</div>
                  <div className="engraved-label text-[9px] mt-0.5">MOF MATRIX</div>
                </div>
              </div>
            </div>
          </Panel>

          {/* Alarm Status */}
          <Panel variant="carbon" title="SYSTEM ALERTS" statusColor="off">
            <div className="p-3 space-y-1.5">
              {[
                { label: 'OVERHEATING', active: metrics.temperature > 58, color: 'red' as const },
                { label: 'LOW HUMIDITY', active: metrics.humidity < 30, color: 'amber' as const },
                { label: 'RESERVOIR FULL', active: metrics.reservoirLevel > 90, color: 'amber' as const },
                { label: 'PUMP FAULT', active: false, color: 'red' as const },
              ].map(alarm => (
                <div key={alarm.label} className="flex items-center gap-2">
                  <LED color={alarm.active ? alarm.color : 'off'} pulsing={alarm.active} size="sm" />
                  <span className="font-label text-[10px]" style={{ color: alarm.active ? '#f59e0b' : 'rgba(100,116,139,0.6)' }}>
                    {alarm.label}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
