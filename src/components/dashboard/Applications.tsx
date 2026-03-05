import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Panel, SectionHeader } from '../ui/Panel';
import { LED } from '../ui/LED';
import { DataReadout } from '../ui/DigitalDisplay';

const applications = [
  {
    id: 'residential',
    title: 'RESIDENTIAL ROOFTOP',
    subtitle: 'Urban & Suburban Deployment',
    color: '#38bdf8',
    specs: [
      { k: 'Array Size', v: '12–20 m²' },
      { k: 'Daily Output', v: '24–60 L/day' },
      { k: 'Household Need', v: '5 persons covered' },
      { k: 'ROI Period', v: '4–6 years' },
    ],
    description: 'Roof-integrated panel arrays on residential buildings in water-scarce regions. Provides supplemental potable water supply reducing municipal water demand by 30–60%.',
    svgScene: 'residential',
  },
  {
    id: 'greenhouse',
    title: 'AGRICULTURAL GREENHOUSE',
    subtitle: 'Precision Irrigation Systems',
    color: '#10b981',
    specs: [
      { k: 'Scale', v: '100–500 m²' },
      { k: 'Water Yield', v: '200–1,500 L/day' },
      { k: 'Crop Benefit', v: 'Leafy greens / herbs' },
      { k: 'Water Saving', v: '80% vs. drip' },
    ],
    description: 'Greenhouse-integrated water harvesting provides precise micro-irrigation using atmospherically-sourced water. Closed-loop system eliminates freshwater dependency for controlled cultivation.',
    svgScene: 'greenhouse',
  },
  {
    id: 'desert',
    title: 'REMOTE DESERT INSTALLATION',
    subtitle: 'Off-Grid Humanitarian Systems',
    color: '#f59e0b',
    specs: [
      { k: 'Location', v: 'Sahara / Arabian / Gobi' },
      { k: 'Array Scale', v: '500–2,000 m²' },
      { k: 'Community Size', v: '100–400 persons' },
      { k: 'Humidity Min.', v: '20% RH viable' },
    ],
    description: 'Standalone desert water stations serving remote communities with zero grid power dependency. Solar-charged battery banks enable 24-hour water distribution cycle.',
    svgScene: 'desert',
  },
  {
    id: 'emergency',
    title: 'EMERGENCY WATER SYSTEM',
    subtitle: 'Disaster Response Deployment',
    color: '#ef4444',
    specs: [
      { k: 'Deploy Time', v: '< 4 hours' },
      { k: 'Module Weight', v: '18 kg/unit' },
      { k: 'Output/Unit', v: '15 L/day' },
      { k: 'Stack Config', v: 'Up to 20 units' },
    ],
    description: 'Rapid-deployment portable units for disaster relief operations. Modular folding design fits in standard shipping container. No power infrastructure required.',
    svgScene: 'emergency',
  },
  {
    id: 'infrastructure',
    title: 'SUSTAINABLE INFRASTRUCTURE',
    subtitle: 'Urban Water Independence',
    color: '#a78bfa',
    specs: [
      { k: 'Integration', v: 'Building facade / highway' },
      { k: 'Output Scale', v: 'MLD (megaliters/day)' },
      { k: 'Grid Tie', v: 'Smart water network' },
      { k: 'Carbon Offset', v: '120 t CO₂/yr (MWh scale)' },
    ],
    description: 'Municipal-scale atmospheric water generation integrated into building facades, highway sound barriers, and urban infrastructure. Feeds directly into smart city water management systems.',
    svgScene: 'infrastructure',
  },
];

const ApplicationSceneSVG: React.FC<{ scene: string; color: string }> = ({ scene, color }) => {
  return (
    <svg viewBox="0 0 300 100" className="w-full" style={{ height: 80 }}>
      <rect x="0" y="0" width="300" height="100" fill="rgba(0,0,0,0.2)" rx="4" />

      {scene === 'residential' && (
        <>
          {/* House outline */}
          <polygon points="100,40 150,10 200,40" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="1.5" />
          <rect x="100" y="40" width="100" height="55" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
          {/* Roof panel */}
          <polygon points="102,39 148,11 148,25 102,53" fill={`${color}20`} stroke={color} strokeWidth="1.5" />
          <polygon points="150,11 198,39 198,53 150,25" fill={`${color}15`} stroke={color} strokeWidth="1" />
          {/* Water drop */}
          <motion.circle cx="150" cy="70" r="4" fill={color} opacity="0.7"
            animate={{ cy: [65, 80], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          {/* Ground line */}
          <line x1="80" y1="95" x2="220" y2="95" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        </>
      )}

      {scene === 'greenhouse' && (
        <>
          {/* Greenhouse arc */}
          <path d="M 80 90 Q 150 20 220 90" fill="none" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
          <path d="M 80 90 L 80 70 Q 150 5 220 70 L 220 90" fill={`${color}10`} stroke={color} strokeWidth="1" />
          {/* Panel inside */}
          {Array.from({ length: 3 }, (_, i) => (
            <rect key={i} x={100 + i * 30} y="45" width="24" height="14" rx="2"
              fill={`${color}25`} stroke={color} strokeWidth="1" />
          ))}
          {/* Water drops */}
          {[105, 145, 185].map((x, i) => (
            <motion.circle key={i} cx={x} cy="70" r="2" fill={color} opacity="0.6"
              animate={{ cy: [65, 85], opacity: [0.7, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }} />
          ))}
        </>
      )}

      {scene === 'desert' && (
        <>
          {/* Sand dunes */}
          <path d="M 0 80 Q 80 55 150 75 Q 220 90 300 70 L 300 100 L 0 100 Z"
            fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.2)" strokeWidth="1" />
          {/* Panel array */}
          {Array.from({ length: 4 }, (_, i) => (
            <rect key={i} x={50 + i * 50} y="50" width="40" height="22" rx="2"
              fill={`${color}20`} stroke={color} strokeWidth="1.5"
              transform={`rotate(-12, ${70 + i * 50}, 61)`} />
          ))}
          {/* Sun */}
          <circle cx="240" cy="20" r="14" fill="rgba(245,158,11,0.6)"
            style={{ filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.6))' }} />
        </>
      )}

      {scene === 'emergency' && (
        <>
          {/* Folding unit outline */}
          {Array.from({ length: 5 }, (_, i) => (
            <rect key={i} x={40 + i * 44} y="35" width="38" height="28" rx="2"
              fill={`${color}15`} stroke={color} strokeWidth="1.5" />
          ))}
          {/* Stack arrows */}
          {[65, 110].map((x, i) => (
            <motion.text key={i} x={x} y="20" textAnchor="middle" fill={color}
              style={{ fontFamily: 'Share Tech Mono', fontSize: 16 }}
              animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}>
              ↕
            </motion.text>
          ))}
          {/* Capacity label */}
          <text x="150" y="80" textAnchor="middle" fill="rgba(239,68,68,0.6)"
            style={{ fontFamily: 'Rajdhani', fontSize: 8, letterSpacing: '0.2em' }}>
            MODULAR FIELD UNIT
          </text>
        </>
      )}

      {scene === 'infrastructure' && (
        <>
          {/* Building facade */}
          <rect x="60" y="10" width="60" height="85" fill="none" stroke="rgba(167,139,250,0.3)" strokeWidth="1" />
          {/* Panel facade tiles */}
          {Array.from({ length: 6 }, (_, row) =>
            Array.from({ length: 3 }, (_, col) => (
              <rect key={`${row}-${col}`} x={62 + col * 19} y={12 + row * 13} width="17" height="11" rx="1"
                fill={`${color}15`} stroke={color} strokeWidth="0.8" />
            ))
          )}
          {/* Road / infrastructure */}
          <rect x="130" y="60" width="130" height="25" fill="rgba(167,139,250,0.05)" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
          {/* Panel strips along road */}
          {Array.from({ length: 4 }, (_, i) => (
            <rect key={i} x={135 + i * 30} y="55" width="24" height="8" rx="1"
              fill={`${color}20`} stroke={color} strokeWidth="1" />
          ))}
          <text x="150" y="96" textAnchor="middle" fill={`${color}60`}
            style={{ fontFamily: 'Rajdhani', fontSize: 7, letterSpacing: '0.1em' }}>
            URBAN INFRASTRUCTURE
          </text>
        </>
      )}
    </svg>
  );
};

const Applications: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <SectionHeader title="APPLICATION SCENARIOS" subtitle="REAL-WORLD DEPLOYMENT CONFIGURATIONS" statusColor="blue" />

      <div className="grid grid-cols-1 gap-3">
        {applications.map(app => (
          <motion.div
            key={app.id}
            className="rounded-md overflow-hidden cursor-pointer"
            style={{
              background: selected === app.id
                ? `linear-gradient(135deg, ${app.color}15 0%, rgba(13,24,37,0.95) 100%)`
                : 'linear-gradient(135deg, rgba(30,45,66,0.8) 0%, rgba(13,24,37,0.95) 100%)',
              border: `1px solid ${selected === app.id ? app.color + '50' : 'rgba(255,255,255,0.07)'}`,
              boxShadow: selected === app.id ? `0 0 20px ${app.color}15` : 'none',
            }}
            onClick={() => setSelected(selected === app.id ? null : app.id)}
            whileHover={{ scale: 1.002 }}
          >
            <div className="p-4 grid grid-cols-12 gap-4 items-start">
              {/* Scene visualization */}
              <div className="col-span-4">
                <ApplicationSceneSVG scene={app.svgScene} color={app.color} />
              </div>

              {/* Text content */}
              <div className="col-span-5">
                <div className="flex items-center gap-2 mb-1">
                  <LED color={selected === app.id ? 'green' : 'off'} size="sm" pulsing={selected === app.id} />
                  <h3 className="font-engineering text-sm" style={{ color: app.color }}>{app.title}</h3>
                </div>
                <div className="engraved-label text-[10px] mb-2">{app.subtitle}</div>
                {selected === app.id && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-slate-400 text-xs leading-relaxed">
                    {app.description}
                  </motion.p>
                )}
              </div>

              {/* Specs */}
              <div className="col-span-3">
                {app.specs.map(spec => (
                  <div key={spec.k} className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="font-label text-[9px] text-slate-500">{spec.k}</span>
                    <span className="font-mono text-[10px]" style={{ color: app.color }}>{spec.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
