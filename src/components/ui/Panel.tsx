import React, { ReactNode } from 'react';

interface PanelProps {
  children: ReactNode;
  className?: string;
  variant?: 'raised' | 'inset' | 'carbon' | 'glass' | 'chrome';
  title?: string;
  subtitle?: string;
  statusColor?: 'green' | 'amber' | 'blue' | 'red' | 'off';
}

export const Panel: React.FC<PanelProps> = ({
  children,
  className = '',
}) => (
  <div className={`rounded-lg border p-4 ${className}`}>
    {children}
  </div>
);

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  statusColor?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <div className="space-y-2">
    <h2 className="text-lg font-bold">{title}</h2>
    {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
  </div>
);

interface MetalScrewProps {
  className?: string;
}

export const MetalScrew: React.FC<MetalScrewProps> = ({ className = '' }) => (
  <div className={`relative ${className}`}>
    <div
      className="w-5 h-5 rounded-full flex items-center justify-center"
      style={{
        background: 'radial-gradient(circle at 40% 35%, #c8d4e0, #8a96a8 40%, #4a5568)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)',
        border: '1px solid rgba(0,0,0,0.3)',
      }}
    >
      <div
        className="w-3 h-0.5 rounded-full"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.2))',
          transform: 'rotate(45deg)',
        }}
      />
    </div>
  </div>
);

export default Panel;
