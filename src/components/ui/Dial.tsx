import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DialProps {
  label?: string;
  min?: number;
  max?: number;
  value?: number;
  color?: 'blue' | 'amber' | 'green';
  size?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export const Dial: React.FC<DialProps> = ({
  label,
  min = 0,
  max = 100,
  value = 50,
  color = 'amber',
  size = 80,
  className = '',
}) => {
  const colorMap = {
    blue: '#38bdf8',
    amber: '#f59e0b',
    green: '#10b981',
  };
  const c = colorMap[color];

  // -135 to +135 degrees range
  const normalized = (value - min) / (max - min);
  const angle = -135 + normalized * 270;

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 6;
  
  // Indicator line position
  const indR = r - 8;
  const indX = cx + indR * Math.cos((angle - 90) * Math.PI / 180);
  const indY = cy + indR * Math.sin((angle - 90) * Math.PI / 180);

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div
        style={{
          width: size + 8,
          height: size + 8,
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #3a4a5c, #1e2d42, #2d3f55)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.4)',
          padding: 4,
          position: 'relative',
        }}
      >
        {/* Knurled edge dots */}
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i / 24) * 360;
          const kr = (size + 8) / 2 - 3;
          const kx = (size + 8) / 2 + kr * Math.cos((a - 90) * Math.PI / 180);
          const ky = (size + 8) / 2 + kr * Math.sin((a - 90) * Math.PI / 180);
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: kx - 1.5,
                top: ky - 1.5,
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
              }}
            />
          );
        })}

        <svg width={size} height={size}>
          {/* Dial face */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="url(#dialFace)"
          />
          <defs>
            <radialGradient id="dialFace">
              <stop offset="0%" stopColor="#1e2d42" />
              <stop offset="100%" stopColor="#060e1f" />
            </radialGradient>
          </defs>

          {/* Track marks */}
          {Array.from({ length: 9 }, (_, i) => {
            const a = -135 + (270 / 8) * i;
            const ir = r - 14;
            const or = r - 4;
            const x1 = cx + ir * Math.cos((a - 90) * Math.PI / 180);
            const y1 = cy + ir * Math.sin((a - 90) * Math.PI / 180);
            const x2 = cx + or * Math.cos((a - 90) * Math.PI / 180);
            const y2 = cy + or * Math.sin((a - 90) * Math.PI / 180);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(255,255,255,0.2)" strokeWidth={i % 4 === 0 ? 2 : 1} />
            );
          })}

          {/* Indicator */}
          <motion.line
            x1={cx} y1={cy}
            x2={indX} y2={indY}
            stroke={c}
            strokeWidth={2.5}
            strokeLinecap="round"
            animate={{ x2: indX, y2: indY }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            style={{ filter: `drop-shadow(0 0 4px ${c})` }}
          />

          {/* Center */}
          <circle cx={cx} cy={cy} r={5}
            fill="linear-gradient(145deg, #3a4a5c, #1e2d42)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={1}
          />
          <circle cx={cx} cy={cy} r={2} fill="rgba(255,255,255,0.5)" />

          {/* Value text */}
          <text x={cx} y={cy + size * 0.25}
            textAnchor="middle"
            fill={c}
            style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: size * 0.18 }}
          >
            {value}
          </text>
        </svg>
      </div>
      {label && <div className="engraved-label text-center text-[10px]">{label}</div>}
    </div>
  );
};

export default Dial;
