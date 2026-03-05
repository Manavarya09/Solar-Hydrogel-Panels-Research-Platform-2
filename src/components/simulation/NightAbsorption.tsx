import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Panel, SectionHeader } from '../ui/Panel';
import { LED } from '../ui/LED';
import { Gauge } from '../ui/Gauge';
import { DataReadout } from '../ui/DigitalDisplay';
import { Toggle } from '../ui/Toggle';

const NightAbsorption: React.FC = () => {
  const [saturation, setSaturation] = useState(12);
  const [humidity, setHumidity] = useState(68);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSaturation(prev => Math.min(95, prev + 0.3));
      setHumidity(prev => Math.max(40, prev + (Math.random() - 0.5) * 3));
    }, 800);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="space-y-4">
      <SectionHeader title="NIGHT ABSORPTION CYCLE" subtitle="ATMOSPHERIC MOISTURE CAPTURE — 20:00–06:00 HRS" statusColor="blue" />

      {/* Night scene visualization */}
      <Panel variant="inset" className="relative overflow-hidden" style={{ minHeight: 240 }}>
        <div className="relative w-full" style={{ height: 240 }}>
          {/* Night sky background */}
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, #0d2040 0%, #040d1a 100%)' }}>
            {/* Stars */}
            {Array.from({ length: 30 }, (_, i) => (
              <motion.div key={i}
                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                style={{
                  left: `${(i * 37 + 10) % 100}%`,
                  top: `${(i * 23 + 5) % 45}%`,
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
            {/* Moon */}
            <div className="absolute top-4 right-12"
              style={{
                width: 32, height: 32,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 40% 35%, #e2e8f0, #94a3b8)',
                boxShadow: '0 0 20px rgba(148,163,184,0.4)',
              }}
            />
          </div>

          {/* Humidity particles (H2O molecules) */}
          <div className="absolute inset-0">
            {Array.from({ length: 18 }, (_, i) => (
              <motion.div key={i}
                className="absolute"
                style={{
                  left: `${(i * 53 + 8) % 90}%`,
                  bottom: `${60 + (i % 5) * 8}%`,
                  fontSize: 10,
                  color: 'rgba(125,211,252,0.7)',
                  fontFamily: 'Share Tech Mono',
                }}
                animate={{
                  y: ['0%', '-80%', '-120%'],
                  x: [0, (i % 2 === 0 ? 12 : -8), (i % 2 === 0 ? 20 : -15)],
                  opacity: [0.8, 0.5, 0],
                  scale: [1, 0.8, 0.5],
                }}
                transition={{ duration: 3 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.3 }}
              >
                H₂O
              </motion.div>
            ))}
          </div>

          {/* Panel schematic */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 800 100" className="w-full">
              <defs>
                <linearGradient id="hydroGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0369a1" stopOpacity="0.9" />
                  <stop offset={`${100 - saturation}%`} stopColor="#0369a1" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Panel frame */}
              <rect x="40" y="20" width="720" height="70" rx="4"
                fill="#0d1825" stroke="rgba(56,189,248,0.3)" strokeWidth="1.5" />

              {/* Hydrogel fill indicator */}
              <rect x="42" y="22" width={`${(saturation / 100) * 716}`} height="66"
                fill="url(#hydroGrad)" rx="2" opacity="0.8" />

              {/* Layer divisions */}
              <line x1="40" y1="50" x2="760" y2="50" stroke="rgba(56,189,248,0.2)" strokeWidth="1" strokeDasharray="4 4" />

              {/* Labels */}
              <text x="400" y="42" textAnchor="middle" fill="rgba(186,230,253,0.7)"
                style={{ fontFamily: 'Rajdhani', fontSize: 9, letterSpacing: '0.2em' }}>
                HYDROGEL MATRIX — ABSORPTION IN PROGRESS
              </text>
              <text x="400" y="62" textAnchor="middle" fill="rgba(148,163,184,0.5)"
                style={{ fontFamily: 'Share Tech Mono', fontSize: 9 }}>
                SATURATION: {saturation.toFixed(1)}%
              </text>

              {/* Absorption arrows */}
              {Array.from({ length: 8 }, (_, i) => (
                <motion.g key={i}>
                  <motion.line
                    x1={80 + i * 90} y1="0"
                    x2={80 + i * 90} y2="18"
                    stroke="#38bdf8" strokeWidth="1.5"
                    animate={{ y1: [-5, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    style={{ filter: 'drop-shadow(0 0 3px #38bdf8)' }}
                  />
                  <motion.text x={80 + i * 90} y="-8" textAnchor="middle"
                    fill="rgba(56,189,248,0.6)"
                    style={{ fontFamily: 'Share Tech Mono', fontSize: 8 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 + 0.5 }}>
                    ↓
                  </motion.text>
                </motion.g>
              ))}
            </svg>
          </div>
        </div>
      </Panel>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-3">
        <Panel variant="raised" title="HYDROGEL SAT." statusColor="blue">
          <div className="p-3 flex justify-center">
            <Gauge value={saturation} min={0} max={100} unit="%" label="SATURATION" color="blue" size={110} />
          </div>
        </Panel>
        <Panel variant="raised" title="AMBIENT HUMIDITY" statusColor="blue">
          <div className="p-3 flex justify-center">
            <Gauge value={humidity} min={0} max={100} unit="%RH" label="REL. HUMIDITY" color="blue" size={110} />
          </div>
        </Panel>
        <Panel variant="carbon" title="AIRFLOW DATA">
          <div className="p-4 space-y-3">
            <DataReadout label="AIRFLOW RATE" value={2.4} unit="m/s" color="blue" />
            <DataReadout label="INLET TEMP." value={18.5} unit="°C" color="blue" />
            <DataReadout label="DEW POINT" value={14.2} unit="°C" color="blue" />
            <DataReadout label="VAPOR PRESSURE" value={1.64} unit="kPa" color="blue" />
          </div>
        </Panel>
        <Panel variant="carbon" title="CONTROLS">
          <div className="p-4 space-y-3">
            <Toggle label="ABSORPTION ACTIVE" defaultOn={running} onChange={setRunning} />
            <Toggle label="AIRFLOW ASSIST" defaultOn={true} />
            <Toggle label="HUMIDITY LOCK" defaultOn={false} />
            <div className="section-divider" />
            <div className="panel-inset rounded p-2 text-center">
              <div className="font-mono text-xs text-sky-400">08h 32m</div>
              <div className="engraved-label text-[9px]">UNTIL SUNRISE</div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Absorption curve */}
      <Panel variant="raised" title="SATURATION PROFILE" subtitle="REAL-TIME ABSORPTION CURVE" statusColor="blue">
        <div className="p-4 relative" style={{ height: 120 }}>
          <svg viewBox="0 0 800 100" className="w-full h-full">
            <defs>
              <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(56,189,248,0.4)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.0)" />
              </linearGradient>
            </defs>

            {/* Grid */}
            {[25, 50, 75].map(y => (
              <line key={y} x1="0" y1={100 - y} x2="800" y2={100 - y}
                stroke="rgba(56,189,248,0.08)" strokeWidth="1" />
            ))}
            {[100, 200, 300, 400, 500, 600, 700].map(x => (
              <line key={x} x1={x} y1="0" x2={x} y2="100"
                stroke="rgba(56,189,248,0.08)" strokeWidth="1" />
            ))}

            {/* Absorption curve (logarithmic fill) */}
            <path
              d={`M 0 100 ${Array.from({ length: 80 }, (_, i) => {
                const t = i / 79;
                const x = t * 800;
                const y = 100 - (100 * (1 - Math.exp(-t * 3)) * saturation / 100);
                return `L ${x} ${y}`;
              }).join(' ')} L 800 100 Z`}
              fill="url(#curveGrad)"
            />
            <path
              d={`M 0 100 ${Array.from({ length: 80 }, (_, i) => {
                const t = i / 79;
                const x = t * 800;
                const y = 100 - (100 * (1 - Math.exp(-t * 3)) * saturation / 100);
                return `L ${x} ${y}`;
              }).join(' ')}`}
              fill="none" stroke="#38bdf8" strokeWidth="2"
              style={{ filter: 'drop-shadow(0 0 4px #38bdf8)' }}
            />

            {/* Labels */}
            <text x="10" y="95" fill="rgba(56,189,248,0.5)" style={{ fontFamily: 'Share Tech Mono', fontSize: 8 }}>0%</text>
            <text x="10" y="10" fill="rgba(56,189,248,0.5)" style={{ fontFamily: 'Share Tech Mono', fontSize: 8 }}>100%</text>
            <text x="790" y="95" textAnchor="end" fill="rgba(56,189,248,0.5)" style={{ fontFamily: 'Share Tech Mono', fontSize: 8 }}>t+8h</text>
          </svg>
        </div>
      </Panel>
    </div>
  );
};

export default NightAbsorption;
