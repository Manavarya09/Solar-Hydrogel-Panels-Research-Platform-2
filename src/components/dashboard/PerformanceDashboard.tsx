import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Panel, SectionHeader } from '../ui/Panel';
import { Gauge } from '../ui/Gauge';
import { DataReadout } from '../ui/DigitalDisplay';

const PerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState({
    waterOutput: 3.2,
    solarEfficiency: 84,
    humidity: 62,
    co2Offset: 2.4,
    panelTemp: 41,
    dailyCycles: 1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        waterOutput: Math.max(0.5, Math.min(5, prev.waterOutput + (Math.random() - 0.5) * 0.15)),
        solarEfficiency: Math.max(60, Math.min(98, prev.solarEfficiency + (Math.random() - 0.5) * 2)),
        humidity: Math.max(20, Math.min(95, prev.humidity + (Math.random() - 0.5) * 3)),
        co2Offset: Math.max(0.5, Math.min(5, prev.co2Offset + (Math.random() - 0.5) * 0.1)),
        panelTemp: Math.max(20, Math.min(80, prev.panelTemp + (Math.random() - 0.5) * 1.5)),
        dailyCycles: 1,
      }));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Historical data simulation
  const generateHistory = (base: number, variance: number, count: number) =>
    Array.from({ length: count }, (_, i) => base + Math.sin(i * 0.8) * variance + (Math.random() - 0.5) * variance * 0.5);

  const waterHistory = generateHistory(3.2, 1.0, 24);
  const efficiencyHistory = generateHistory(82, 10, 24);
  const tempHistory = generateHistory(42, 15, 24);

  const chartHeight = 80;
  const chartWidth = 600;

  const toPath = (data: number[], min: number, max: number) => {
    return data.map((v, i) => {
      const x = (i / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((v - min) / (max - min)) * chartHeight;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const toArea = (data: number[], min: number, max: number) => {
    const line = toPath(data, min, max);
    return `${line} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;
  };

  return (
    <div className="space-y-4">
      <SectionHeader title="PERFORMANCE METRICS" subtitle="REAL-TIME SYSTEM MEASUREMENT INTERFACE" statusColor="green" />

      {/* Primary gauges */}
      <div className="grid grid-cols-6 gap-3">
        {[
          { value: metrics.waterOutput, min: 0, max: 5, unit: 'L/m²/day', label: 'WATER OUTPUT', color: 'blue' as const },
          { value: metrics.solarEfficiency, min: 0, max: 100, unit: '%', label: 'EFFICIENCY', color: 'green' as const },
          { value: metrics.humidity, min: 0, max: 100, unit: '%RH', label: 'HUMIDITY', color: 'blue' as const },
          { value: metrics.panelTemp, min: 0, max: 80, unit: '°C', label: 'PANEL TEMP', color: 'amber' as const },
          { value: metrics.co2Offset * 20, min: 0, max: 100, unit: 'kg/day', label: 'CO₂ OFFSET', color: 'green' as const },
          { value: metrics.solarEfficiency * 0.8, min: 0, max: 100, unit: 'kWh', label: 'SOLAR INPUT', color: 'amber' as const },
        ].map((g, i) => (
          <Panel key={i} variant="inset" className="p-2">
            <Gauge
              value={g.value}
              min={g.min}
              max={g.max}
              unit={g.unit}
              label={g.label}
              color={g.color}
              size={100}
              decimals={g.unit === 'L/m²/day' ? 1 : 0}
            />
          </Panel>
        ))}
      </div>

      {/* Data readout bank */}
      <div className="grid grid-cols-4 gap-3">
        <Panel variant="raised" title="WATER METRICS" statusColor="blue">
          <div className="p-3 space-y-2">
            <DataReadout label="DAILY YIELD" value={metrics.waterOutput} unit="L/m²" color="blue" />
            <DataReadout label="10m² ARRAY DAILY" value={metrics.waterOutput * 10} unit="L/DAY" color="blue" />
            <DataReadout label="ANNUAL ESTIMATE" value={metrics.waterOutput * 365 * 10} unit="L/YR" color="blue" />
            <DataReadout label="EFFICIENCY" value={metrics.solarEfficiency} unit="%" color="green" />
          </div>
        </Panel>
        <Panel variant="raised" title="ENERGY METRICS" statusColor="amber">
          <div className="p-3 space-y-2">
            <DataReadout label="SOLAR IRRADIANCE" value={metrics.panelTemp * 10.5} unit="W/m²" color="amber" />
            <DataReadout label="HEAT GENERATED" value={metrics.panelTemp * 0.9} unit="°C AVG" color="amber" />
            <DataReadout label="ENERGY PER LITER" value={2.8 + Math.random() * 0.4} unit="kWh/L" color="amber" />
            <DataReadout label="ENERGY COST" value={0.12} unit="$/L" color="amber" />
          </div>
        </Panel>
        <Panel variant="raised" title="ENVIRONMENTAL" statusColor="green">
          <div className="p-3 space-y-2">
            <DataReadout label="CO₂ OFFSET/DAY" value={metrics.co2Offset} unit="KG" color="green" />
            <DataReadout label="CO₂ OFFSET/YR" value={metrics.co2Offset * 365} unit="KG" color="green" />
            <DataReadout label="WATER FOOTPRINT" value={0} unit="LITERS" color="green" />
            <DataReadout label="GRID POWER SAVED" value={metrics.co2Offset * 4.2} unit="kWh/yr" color="green" />
          </div>
        </Panel>
        <Panel variant="raised" title="OPERATIONAL" statusColor="green">
          <div className="p-3 space-y-2">
            <DataReadout label="UPTIME" value={99.2} unit="%" color="green" />
            <DataReadout label="CYCLES COMPLETED" value={1428} unit="TOTAL" color="blue" />
            <DataReadout label="MATERIAL LIFE" value={5} unit="+ YRS" color="green" />
            <DataReadout label="MAINTENANCE" value={2} unit="HR/YR" color="green" />
          </div>
        </Panel>
      </div>

      {/* Historical charts */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { title: 'WATER OUTPUT — 24H PROFILE', data: waterHistory, min: 0, max: 5, color: '#38bdf8', unit: 'L/m²' },
          { title: 'EFFICIENCY — 24H PROFILE', data: efficiencyHistory, min: 40, max: 100, color: '#10b981', unit: '%' },
          { title: 'TEMPERATURE — 24H PROFILE', data: tempHistory, min: 10, max: 80, color: '#f59e0b', unit: '°C' },
        ].map((chart, ci) => (
          <Panel key={ci} variant="raised" title={chart.title} statusColor={ci === 0 ? 'blue' : ci === 1 ? 'green' : 'amber'}>
            <div className="p-3 relative" style={{ height: 110 }}>
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`areaGrad${ci}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chart.color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={chart.color} stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[25, 50, 75].map(y => (
                  <line key={y} x1="0" y1={y / 100 * chartHeight} x2={chartWidth} y2={y / 100 * chartHeight}
                    stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                ))}
                {/* Area */}
                <path d={toArea(chart.data, chart.min, chart.max)} fill={`url(#areaGrad${ci})`} />
                {/* Line */}
                <path d={toPath(chart.data, chart.min, chart.max)} fill="none" stroke={chart.color} strokeWidth="1.5"
                  style={{ filter: `drop-shadow(0 0 3px ${chart.color})` }} />
                {/* Current value dot */}
                <circle cx={chartWidth} cy={chartHeight - ((chart.data[chart.data.length - 1] - chart.min) / (chart.max - chart.min)) * chartHeight}
                  r="3" fill={chart.color} style={{ filter: `drop-shadow(0 0 4px ${chart.color})` }} />
              </svg>
              <div className="absolute bottom-2 right-3 font-mono text-xs" style={{ color: chart.color }}>
                {chart.data[chart.data.length - 1].toFixed(1)} {chart.unit}
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
};

export default PerformanceDashboard;
