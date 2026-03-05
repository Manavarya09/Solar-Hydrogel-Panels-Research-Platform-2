import React from 'react';
import { motion } from 'framer-motion';
import { Panel, SectionHeader, MetalScrew } from '../ui/Panel';

const PrototypeViewer: React.FC = () => {
  return (
    <div className="space-y-4">
      <SectionHeader title="PROTOTYPE DESIGN" subtitle="CAD SCHEMATIC — SOLAR HYDROGEL PANEL v4.2" statusColor="blue" />

      {/* Blueprint main panel */}
      <div className="blueprint-grid rounded-md overflow-hidden p-6 relative"
        style={{ border: '1px solid rgba(56,189,248,0.15)', minHeight: 400 }}>
        
        {/* Title block */}
        <div className="absolute top-3 left-4 right-4 flex justify-between items-start">
          <div>
            <div className="font-mono text-[10px] text-sky-600">PROJECT: SOLAR HYDROGEL AWH PANEL</div>
            <div className="font-mono text-[9px] text-sky-800">DWG NO: SHP-AWH-PRO-004 | REV: C | SCALE: 1:8</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[9px] text-sky-800">DATE: 2026-03-04</div>
            <div className="font-mono text-[9px] text-sky-800">SHEET: 1 OF 3</div>
          </div>
        </div>

        {/* Main panel cross-section */}
        <div className="mt-10">
          <svg viewBox="0 0 900 320" className="w-full">
            <defs>
              <linearGradient id="bpSolar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(245,158,11,0.4)" />
                <stop offset="100%" stopColor="rgba(120,53,15,0.3)" />
              </linearGradient>
              <linearGradient id="bpHydro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(14,165,233,0.4)" />
                <stop offset="100%" stopColor="rgba(3,105,161,0.3)" />
              </linearGradient>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 Z" fill="rgba(56,189,248,0.6)" />
              </marker>
              <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 Z" fill="rgba(245,158,11,0.6)" />
              </marker>
            </defs>

            {/* === FRONT VIEW (LEFT) === */}
            <text x="220" y="18" textAnchor="middle" fill="rgba(56,189,248,0.6)"
              style={{ fontFamily: 'Rajdhani', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              FRONT VIEW — CROSS SECTION
            </text>
            
            {/* Outer frame */}
            <rect x="60" y="25" width="320" height="240" rx="4"
              fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth="2" />
            
            {/* Layer 1: Glass cover */}
            <rect x="62" y="27" width="316" height="28" rx="2"
              fill="rgba(125,211,252,0.15)" stroke="rgba(125,211,252,0.5)" strokeWidth="1" />
            <text x="220" y="44" textAnchor="middle" fill="rgba(125,211,252,0.7)"
              style={{ fontFamily: 'Rajdhani', fontSize: 8, letterSpacing: '0.15em' }}>
              LOW-IRON TEMPERED GLASS — 4mm AR COATING
            </text>
            
            {/* Layer 2: Solar absorber */}
            <rect x="62" y="55" width="316" height="32" fill="url(#bpSolar)"
              stroke="rgba(245,158,11,0.5)" strokeWidth="1.5" />
            <text x="220" y="73" textAnchor="middle" fill="rgba(251,191,36,0.8)"
              style={{ fontFamily: 'Rajdhani', fontSize: 8, letterSpacing: '0.15em' }}>
              PHOTOTHERMAL ABSORBER — TiN / CARBON COMPOSITE
            </text>
            
            {/* Layer 3: Hydrogel */}
            <rect x="62" y="87" width="316" height="52" fill="url(#bpHydro)"
              stroke="rgba(14,165,233,0.5)" strokeWidth="1.5" />
            <text x="220" y="116" textAnchor="middle" fill="rgba(125,211,252,0.8)"
              style={{ fontFamily: 'Rajdhani', fontSize: 8, letterSpacing: '0.15em' }}>
              HYDROGEL–MOF MATRIX — 8mm / LiCl DOPED
            </text>
            
            {/* Micro-channel patterns in hydrogel */}
            {Array.from({ length: 8 }, (_, i) => (
              <line key={i} x1={72 + i * 38} y1="87" x2={72 + i * 38} y2="139"
                stroke="rgba(56,189,248,0.2)" strokeWidth="0.5" strokeDasharray="2 2" />
            ))}
            
            {/* Layer 4: Vapor channels */}
            <rect x="62" y="139" width="316" height="18" fill="rgba(16,185,129,0.15)"
              stroke="rgba(16,185,129,0.4)" strokeWidth="1" />
            {/* Channel cells */}
            {Array.from({ length: 12 }, (_, i) => (
              <rect key={i} x={65 + i * 26} y="141" width="22" height="14" rx="2"
                fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.5" />
            ))}
            <text x="220" y="151" textAnchor="middle" fill="rgba(16,185,129,0.7)"
              style={{ fontFamily: 'Rajdhani', fontSize: 7, letterSpacing: '0.15em' }}>
              MICRO-CHANNEL VAPOR TRANSPORT ARRAY
            </text>
            
            {/* Layer 5: Condensation */}
            <rect x="62" y="157" width="316" height="22" fill="rgba(30,41,59,0.8)"
              stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
            {/* Fins */}
            {Array.from({ length: 16 }, (_, i) => (
              <rect key={i} x={65 + i * 19} y="158" width="2" height="20"
                fill="rgba(148,163,184,0.4)" />
            ))}
            <text x="220" y="172" textAnchor="middle" fill="rgba(148,163,184,0.7)"
              style={{ fontFamily: 'Rajdhani', fontSize: 7 }}>
              CONDENSATION FINS — COPPER ALLOY
            </text>
            
            {/* Layer 6: Collection channel */}
            <rect x="62" y="179" width="316" height="16" fill="rgba(14,165,233,0.25)"
              stroke="rgba(56,189,248,0.4)" strokeWidth="1.5" />
            {/* Water flow arrows */}
            <line x1="80" y1="187" x2="340" y2="187"
              stroke="rgba(56,189,248,0.5)" strokeWidth="1"
              markerEnd="url(#arrow)" strokeDasharray="4 2" />
            <text x="220" y="193" textAnchor="middle" fill="rgba(56,189,248,0.6)"
              style={{ fontFamily: 'Share Tech Mono', fontSize: 7 }}>
              WATER COLLECTION — GRAVITY FED
            </text>
            
            {/* Layer 7: Structural frame */}
            <rect x="62" y="195" width="316" height="28" fill="rgba(30,41,59,0.9)"
              stroke="rgba(71,85,105,0.5)" strokeWidth="1.5" />
            <text x="220" y="212" textAnchor="middle" fill="rgba(71,85,105,0.8)"
              style={{ fontFamily: 'Rajdhani', fontSize: 8 }}>
              ANODIZED ALUMINUM FRAME — 2mm / 6061-T6
            </text>
            
            {/* Mounting holes */}
            {[75, 360].map((x, i) => (
              <circle key={i} cx={x} cy="260" r="6" fill="none"
                stroke="rgba(56,189,248,0.4)" strokeWidth="1.5" />
            ))}
            
            {/* Dimension lines */}
            <line x1="40" y1="25" x2="40" y2="263" stroke="rgba(56,189,248,0.3)" strokeWidth="0.8" />
            <line x1="35" y1="25" x2="45" y2="25" stroke="rgba(56,189,248,0.3)" strokeWidth="0.8" />
            <line x1="35" y1="263" x2="45" y2="263" stroke="rgba(56,189,248,0.3)" strokeWidth="0.8" />
            <text x="25" y="145" textAnchor="middle" fill="rgba(56,189,248,0.5)"
              transform="rotate(-90, 25, 145)"
              style={{ fontFamily: 'Share Tech Mono', fontSize: 8 }}>
              240mm
            </text>
            
            <line x1="60" y1="280" x2="380" y2="280" stroke="rgba(56,189,248,0.3)" strokeWidth="0.8" />
            <line x1="60" y1="275" x2="60" y2="285" stroke="rgba(56,189,248,0.3)" strokeWidth="0.8" />
            <line x1="380" y1="275" x2="380" y2="285" stroke="rgba(56,189,248,0.3)" strokeWidth="0.8" />
            <text x="220" y="295" textAnchor="middle" fill="rgba(56,189,248,0.5)"
              style={{ fontFamily: 'Share Tech Mono', fontSize: 8 }}>
              1200mm (standard module)
            </text>

            {/* === SIDE VIEW (RIGHT) === */}
            <text x="680" y="18" textAnchor="middle" fill="rgba(56,189,248,0.6)"
              style={{ fontFamily: 'Rajdhani', fontSize: 10, letterSpacing: '0.2em' }}>
              SIDE VIEW — AIRFLOW PATHS
            </text>
            
            <rect x="560" y="25" width="80" height="240" rx="4"
              fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1.5" />
            
            {/* Layer colors on side */}
            <rect x="562" y="27" width="76" height="18" fill="rgba(125,211,252,0.1)" stroke="rgba(125,211,252,0.3)" strokeWidth="0.8" />
            <rect x="562" y="45" width="76" height="22" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" strokeWidth="0.8" />
            <rect x="562" y="67" width="76" height="35" fill="rgba(14,165,233,0.1)" stroke="rgba(14,165,233,0.3)" strokeWidth="0.8" />
            <rect x="562" y="102" width="76" height="12" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.2)" strokeWidth="0.8" />
            <rect x="562" y="114" width="76" height="14" fill="rgba(30,41,59,0.5)" stroke="rgba(148,163,184,0.2)" strokeWidth="0.8" />
            <rect x="562" y="128" width="76" height="12" fill="rgba(14,165,233,0.15)" stroke="rgba(56,189,248,0.3)" strokeWidth="0.8" />
            
            {/* Tilt angle indicator */}
            <line x1="660" y1="25" x2="660" y2="265" stroke="rgba(56,189,248,0.2)" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="562" y1="265" x2="660" y2="225" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="700" y="250" fill="rgba(245,158,11,0.6)"
              style={{ fontFamily: 'Share Tech Mono', fontSize: 8 }}>
              5-15°
            </text>
            <text x="720" y="260" fill="rgba(245,158,11,0.5)"
              style={{ fontFamily: 'Rajdhani', fontSize: 7, letterSpacing: '0.1em' }}>
              TILT RANGE
            </text>

            {/* Night airflow arrows */}
            {[580, 620].map((x, i) => (
              <motion.g key={i}>
                <motion.line x1={x} y1="20" x2={x} y2="60"
                  stroke="rgba(56,189,248,0.5)" strokeWidth="1"
                  markerEnd="url(#arrow)"
                  animate={{ opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
              </motion.g>
            ))}
            <text x="600" y="18" textAnchor="middle" fill="rgba(56,189,248,0.5)"
              style={{ fontFamily: 'Rajdhani', fontSize: 7 }}>
              HUMID AIR INTAKE
            </text>

            {/* Water outlet */}
            <line x1="638" y1="140" x2="680" y2="140" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="685" y="143" fill="rgba(56,189,248,0.6)" style={{ fontFamily: 'Rajdhani', fontSize: 7 }}>
              WATER OUT
            </text>

            {/* Solar heat indicators */}
            {[575, 610, 625].map((x, i) => (
              <motion.line key={i} x1={x} y1="15" x2={x} y2="42"
                stroke="rgba(245,158,11,0.6)" strokeWidth="1.5"
                animate={{ opacity: [0.3, 1, 0.3], y1: [10, 15, 10] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                markerEnd="url(#arrowAmber)"
              />
            ))}
          </svg>
        </div>

        {/* Specifications table at bottom */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Panel variant="carbon" title="PANEL DIMENSIONS">
            <div className="p-3 space-y-1">
              {[
                ['Length', '1200 mm'],
                ['Width', '600 mm'],
                ['Thickness', '28 mm'],
                ['Weight', '4.2 kg/m²'],
                ['Tilt Range', '5–15°'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-white/5 py-0.5">
                  <span className="font-label text-[10px] text-slate-500">{k}</span>
                  <span className="font-mono text-[10px] text-sky-400">{v}</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel variant="carbon" title="MATERIAL SPEC">
            <div className="p-3 space-y-1">
              {[
                ['Frame', 'Al 6061-T6 anodized'],
                ['Glass', 'Low-iron AR tempered'],
                ['Hydrogel', 'PAAm-PAA + MOF-801'],
                ['Absorber', 'TiN / Carbon black'],
                ['Channel', 'HDPE food-grade'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-white/5 py-0.5">
                  <span className="font-label text-[10px] text-slate-500">{k}</span>
                  <span className="font-mono text-[10px] text-sky-400">{v}</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel variant="carbon" title="PERFORMANCE SPEC">
            <div className="p-3 space-y-1">
              {[
                ['Output', '1–5 L/m²/day'],
                ['Min. Humidity', '20% RH'],
                ['Operating Temp.', '-10°C to +60°C'],
                ['Design Life', '20+ years'],
                ['IP Rating', 'IP65 (weather)'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-white/5 py-0.5">
                  <span className="font-label text-[10px] text-slate-500">{k}</span>
                  <span className="font-mono text-[10px] text-sky-400">{v}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default PrototypeViewer;
