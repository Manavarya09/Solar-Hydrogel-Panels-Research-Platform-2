import React from 'react';

interface LEDProps {
  color?: 'green' | 'amber' | 'blue' | 'red' | 'off';
  size?: 'sm' | 'md' | 'lg';
  pulsing?: boolean;
  label?: string;
  className?: string;
}

const colorMapSimple = { green: '#10b981', amber: '#f59e0b', blue: '#3b82f6', red: '#ef4444', off: '#6b7280' };
const sizeMap = { sm: '8px', md: '12px', lg: '16px' };

export const LED: React.FC<LEDProps> = ({ color = 'off', size = 'md', pulsing = false, label, className = '' }) => {
  const px = sizeMap[size];

  const colorVariants: Record<string, { bg: string; shadow: string }> = {
    green: { bg: 'radial-gradient(circle at 35% 35%, #6ee7b7, #10b981 50%, #065f46)', shadow: '0 0 6px #10b981' },
    amber: { bg: 'radial-gradient(circle at 35% 35%, #fde68a, #f59e0b 50%, #92400e)', shadow: '0 0 6px #f59e0b' },
    blue: { bg: 'radial-gradient(circle at 35% 35%, #bae6fd, #38bdf8 50%, #0369a1)', shadow: '0 0 6px #38bdf8' },
    red: { bg: 'radial-gradient(circle at 35% 35%, #fca5a5, #ef4444 50%, #7f1d1d)', shadow: '0 0 6px #ef4444' },
    off: { bg: 'radial-gradient(circle at 35% 35%, #374151, #1f2937)', shadow: 'inset 0 1px 2px rgba(0,0,0,0.6)' },
  };

  const { bg, shadow } = colorVariants[color] || colorVariants.off;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div
        className={pulsing ? 'animate-pulse-led' : ''}
        style={{
          width: px,
          height: px,
          borderRadius: '50%',
          background: bg,
          boxShadow: shadow,
          border: '1px solid rgba(0,0,0,0.4)',
          flexShrink: 0,
        }}
      />
      {label && <span className="engraved-label text-[10px]">{label}</span>}
    </div>
  );
};

export default LED;
