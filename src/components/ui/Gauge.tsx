import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GaugeProps {
  value: number;
  min?: number;
  max?: number;
  unit?: string;
  label?: string;
  color?: 'blue' | 'amber' | 'green' | 'red';
  size?: number;
  animated?: boolean;
  decimals?: number;
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  min = 0,
  max = 100,
  unit = '',
  label = '',
  color = 'blue',
  size = 160,
  animated = true,
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(min);

  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      return;
    }
    const duration = 1500;
    const start = displayValue;
    const end = value;
    const startTime = Date.now();
    
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(start + (end - start) * ease);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  const colorMap = {
    blue: { primary: '#38bdf8', secondary: '#0369a1', glow: 'rgba(56,189,248,0.4)', tick: '#7dd3fc' },
    amber: { primary: '#f59e0b', secondary: '#92400e', glow: 'rgba(245,158,11,0.4)', tick: '#fde68a' },
    green: { primary: '#10b981', secondary: '#065f46', glow: 'rgba(16,185,129,0.4)', tick: '#6ee7b7' },
    red: { primary: '#ef4444', secondary: '#7f1d1d', glow: 'rgba(239,68,68,0.4)', tick: '#fca5a5' },
  };
  
  const c = colorMap[color];
  const radius = size / 2 - 16;
  const cx = size / 2;
  const cy = size / 2;
  const startAngle = -220; // degrees
  const endAngle = 40;
  const totalAngle = endAngle - startAngle;
  
  const normalized = Math.max(0, Math.min(1, (displayValue - min) / (max - min)));
  const needleAngle = startAngle + totalAngle * normalized;
  
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  
  // Arc path
  const arcStart = { x: cx + radius * Math.cos(toRad(startAngle)), y: cy + radius * Math.sin(toRad(startAngle)) };
  const arcEnd = { x: cx + radius * Math.cos(toRad(endAngle)), y: cy + radius * Math.sin(toRad(endAngle)) };
  const arcPath = `M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 1 1 ${arcEnd.x} ${arcEnd.y}`;
  
  // Active arc
  const activeAngle = startAngle + totalAngle * normalized;
  const activeEnd = { x: cx + radius * Math.cos(toRad(activeAngle)), y: cy + radius * Math.sin(toRad(activeAngle)) };
  const largeArc = (activeAngle - startAngle) > 180 ? 1 : 0;
  const activeArcPath = `M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 ${largeArc} 1 ${activeEnd.x} ${activeEnd.y}`;
  
  // Tick marks
  const ticks = Array.from({ length: 11 }, (_, i) => i / 10);
  
  // Needle
  const nLength = radius - 8;
  const nX = cx + nLength * Math.cos(toRad(needleAngle));
  const nY = cy + nLength * Math.sin(toRad(needleAngle));

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative flex items-center justify-center gauge-bezel rounded-full"
        style={{ width: size + 16, height: size + 16, padding: 8 }}
      >
        <svg width={size} height={size} className="gauge-face rounded-full">
          <defs>
            <filter id={`glow-${color}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Background arc */}
          <path d={arcPath} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          
          {/* Active arc */}
          <path
            d={activeArcPath}
            fill="none"
            stroke={c.primary}
            strokeWidth="8"
            strokeLinecap="round"
            filter={`url(#glow-${color})`}
            style={{ transition: 'd 0.8s ease' }}
          />
          
          {/* Tick marks */}
          {ticks.map((t, i) => {
            const tickAngle = startAngle + totalAngle * t;
            const innerR = radius - 18;
            const outerR = radius - 4;
            const tx1 = cx + innerR * Math.cos(toRad(tickAngle));
            const ty1 = cy + innerR * Math.sin(toRad(tickAngle));
            const tx2 = cx + outerR * Math.cos(toRad(tickAngle));
            const ty2 = cy + outerR * Math.sin(toRad(tickAngle));
            return (
              <line
                key={i}
                x1={tx1} y1={ty1} x2={tx2} y2={ty2}
                stroke={i === 0 || i === 5 || i === 10 ? c.tick : 'rgba(255,255,255,0.2)'}
                strokeWidth={i % 5 === 0 ? 2 : 1}
              />
            );
          })}
          
          {/* Needle */}
          <motion.line
            x1={cx}
            y1={cy}
            x2={nX}
            y2={nY}
            stroke={c.primary}
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#glow-${color})`}
            animate={{ x2: nX, y2: nY }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          />
          
          {/* Center hub */}
          <circle cx={cx} cy={cy} r={6} fill={c.secondary} stroke={c.primary} strokeWidth={2} />
          <circle cx={cx} cy={cy} r={3} fill="rgba(255,255,255,0.6)" />
          
          {/* Value display */}
          <text x={cx} y={cy + radius * 0.5} textAnchor="middle" fill={c.primary}
            style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: size * 0.15, textShadow: `0 0 8px ${c.primary}` }}>
            {displayValue.toFixed(decimals)}
          </text>
          <text x={cx} y={cy + radius * 0.5 + size * 0.1} textAnchor="middle" fill="rgba(255,255,255,0.4)"
            style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: size * 0.08, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {unit}
          </text>
        </svg>
      </div>
      {label && <div className="engraved-label text-center">{label}</div>}
    </div>
  );
};

export default Gauge;
