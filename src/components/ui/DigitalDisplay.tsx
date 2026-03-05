import React, { useEffect, useState } from 'react';

interface DigitalDisplayProps {
  value: string | number;
  unit?: string;
  color?: 'green' | 'amber' | 'blue';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const formatNumber = (v: number, decimals = 1) => v.toFixed(decimals);

export const DigitalDisplay: React.FC<DigitalDisplayProps> = ({
  value,
  unit,
  color = 'green',
  label,
  size = 'md',
  animated = false,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState<string | number>(value);

  useEffect(() => {
    if (animated && typeof value === 'number') {
      let frame = 0;
      const duration = 40;
      const start = typeof displayValue === 'number' ? displayValue : 0;
      const end = value;
      const step = () => {
        frame++;
        const t = Math.min(frame / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = start + (end - start) * eased;
        setDisplayValue(current);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    } else {
      setDisplayValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const sizeClass = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-4xl';

  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {label && <div className="engraved-label text-[10px]">{label}</div>}
      <div className={`digital-display ${color} ${sizeClass}`}>
        {typeof displayValue === 'number' ? formatNumber(displayValue as number) : displayValue}
        {unit && <span className="text-xs ml-1 opacity-60">{unit}</span>}
      </div>
    </div>
  );
};

interface DataReadoutProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: 'blue' | 'amber' | 'green';
  className?: string;
}

export const DataReadout: React.FC<DataReadoutProps> = ({
  label,
  value,
  unit,
  color = 'blue',
  className = '',
}) => {
  const colorMap: Record<string, string> = {
    blue: '#38bdf8',
    amber: '#f59e0b',
    green: '#10b981',
  };
  const c = colorMap[color];

  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <div className="engraved-label text-[10px]">{label}</div>
      <div className="flex items-baseline gap-1">
        <span
          className="font-mono text-xl font-bold"
          style={{ color: c, textShadow: `0 0 10px ${c}50` }}
        >
          {typeof value === 'number' ? formatNumber(value as number) : value}
        </span>
        {unit && (
          <span className="font-label text-[10px] text-slate-500">{unit}</span>
        )}
      </div>
    </div>
  );
};

export default DigitalDisplay;
