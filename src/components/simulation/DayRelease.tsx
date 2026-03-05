import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Panel, SectionHeader } from '../ui/Panel';
import { LED } from '../ui/LED';
import { Gauge } from '../ui/Gauge';
import { DataReadout } from '../ui/DigitalDisplay';
import { Toggle } from '../ui/Toggle';

const DayRelease: React.FC = () => {
  const [solarTemp, setSolarTemp] = useState(22);
  const [waterGenerated, setWaterGenerated] = useState(0);
  const [vaporDensity, setVaporDensity] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSolarTemp(prev => Math.min(82, prev + 0.4 + Math.random() * 0.3));
      setWaterGenerated(prev => Math.min(5.0, prev + 0.008));
      setVaporDensity(prev => {
        const heat = Math.min(100, (solarTemp / 82) * 100);
        return heat > 40 ? Math.min(90, prev + 2) : Math.max(0, prev - 1);
      });
    }, 600);
    return () => clearInterval(interval);
  }, [running, solarTemp]);

  const heatPhase = solarTemp < 40 ? 'PRE-HEAT' : solarTemp < 60 ? 'HEATING' : 'VAPOR RELEASE';

  return (
    <div className="space-y-4">
      <SectionHeader title="DAY RELEASE CYCLE" subtitle="SOLAR-DRIVEN VAPOR DESORPTION — 06:00–18:00 HRS" statusColor="amber" />

      {/* Solar phase visualization */}
      <Panel variant="inset" className="relative overflow-hidden" style={{ minHeight: 240 }}>
        <div className="relative w-full" style={{ height: 240 }}>
          {/* Day sky */}
          <div className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, 
                ${solarTemp > 50 ? 'rgba(245,158,11,0.15)' : 'rgba(14,165,233,0.1)'} 0%, 
                rgba(4,13,26,0.95) 80%)`,
            }}
          />

          {/* Sun with heat rays */}
          <div className="absolute top-4 right-16">
            <motion.div
              style={{
                width: 44, height: 44, borderRadius: '50%',
                background: `radial-gradient(circle at 40% 35%, #fde68a, #f59e0b 60%, #d97706)`,
                boxShadow: `0 0 ${20 + solarTemp}px rgba(245,158,11,0.8), 0 0 ${50 + solarTemp * 2}px rgba(245,158,11,0.3)`,
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Heat rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <motion.div
                key={angle}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 20 + solarTemp * 0.3,
                  height: 2,
                  background: 'linear-gradient(90deg, rgba(245,158,11,0.8), transparent)',
                  transformOrigin: '0 50%',
                  transform: `rotate(${angle}deg) translateX(22px)`,
                  opacity: 0.6,
                }}
                animate={{ opacity: [0.3, 0.8, 0.3], width: [20, 28 + solarTemp * 0.2, 20] }}
                transition={{ duration: 2, repeat: Infinity, delay: angle / 360 }}
              />
            ))}
          </div>

          {/* Solar arrows hitting panel */}
          <div className="absolute left-0 right-0" style={{ bottom: '40%', top: '20%' }}>
            {Array.from({ length: 7 }, (_, i) => (
              <motion.div key={i}
                className="absolute"
                style={{
                  left: `${10 + i * 12}%`,
                  top: 0,
                  width: 2,
                  background: `linear-gradient(180deg, rgba(245,158,11,0.8), rgba(245,158,11,0.1))`,
                  borderRadius: 1,
                }}
                animate={{
                  height: ['0%', '100%'],
                  opacity: [0, 0.8, 0],
                }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>

          {/* Vapor particles */}
          {vaporDensity > 20 && Array.from({ length: 10 }, (_, i) => (
            <motion.div key={i}
              className="absolute"
              style={{
                left: `${10 + i * 9}%`,
                bottom: '45%',
                width: 6, height: 6,
                borderRadius: '50%',
                background: 'rgba(186,230,253,0.6)',
                boxShadow: '0 0 4px rgba(186,230,253,0.4)',
              }}
              animate={{
                y: [-0, -60, -100],
                x: [0, (i % 2 === 0 ? 12 : -8)],
                opacity: [0.8, 0.4, 0],
                scale: [0.8, 1.2, 0.4],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}

          {/* Water drips (condensation) */}
          {vaporDensity > 50 && Array.from({ length: 5 }, (_, i) => (
            <motion.div key={i}
              className="absolute"
              style={{
                left: `${15 + i * 16}%`,
                top: '65%',
                width: 4, height: 8,
                borderRadius: '0 0 4px 4px',
                background: 'linear-gradient(180deg, rgba(56,189,248,0.8), rgba(56,189,248,0.4))',
                boxShadow: '0 0 4px rgba(56,189,248,0.4)',
              }}
              animate={{
                y: [0, 30, 40],
                opacity: [0, 1, 0],
                scaleY: [0.5, 1, 0.6],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}

          {/* Panel */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 800 80" className="w-full">
              {/* Solar absorber glow */}
              <rect x="40" y="5" width="720" height="20" rx="2"
                fill={`rgba(146,64,14,${0.3 + solarTemp / 200})`}
                stroke="rgba(245,158,11,0.4)" strokeWidth="1.5"
              />
              <text x="400" y="18" textAnchor="middle"
                fill={`rgba(251,191,36,${0.5 + solarTemp / 160})`}
                style={{ fontFamily: 'Rajdhani', fontSize: 8, letterSpacing: '0.2em' }}>
                SOLAR ABSORBER — {solarTemp.toFixed(0)}°C
              </text>

              {/* Hydrogel */}
              <rect x="40" y="25" width="720" height="25" fill="rgba(3,105,161,0.5)"
                stroke="rgba(14,165,233,0.3)" strokeWidth="1" />
              <text x="400" y="40" textAnchor="middle" fill="rgba(125,211,252,0.7)"
                style={{ fontFamily: 'Rajdhani', fontSize: 8, letterSpacing: '0.2em' }}>
                HYDROGEL — RELEASING VAPOR ({vaporDensity.toFixed(0)}% DESORPTION)
              </text>

              {/* Collection */}
              <rect x="40" y="50" width="720" height="20" fill="rgba(7,36,75,0.8)"
                stroke="rgba(56,189,248,0.2)" strokeWidth="1" />
              <rect x="42" y="52" width={`${(waterGenerated / 5) * 716}`} height="16"
                fill="rgba(56,189,248,0.4)" rx="1" />
              <text x="400" y="63" textAnchor="middle" fill="rgba(56,189,248,0.7)"
                style={{ fontFamily: 'Share Tech Mono', fontSize: 9 }}>
                WATER COLLECTED: {waterGenerated.toFixed(2)} L/m²
              </text>
            </svg>
          </div>

          {/* Phase indicator */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded"
              style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(245,158,11,0.3)' }}>
              <LED color="amber" pulsing size="sm" />
              <span className="font-engineering text-xs text-amber-400">{heatPhase}</span>
            </div>
          </div>
        </div>
      </Panel>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-3">
        <Panel variant="raised" title="SOLAR TEMPERATURE" statusColor="amber">
          <div className="p-3 flex justify-center">
            <Gauge value={solarTemp} min={0} max={100} unit="°C" label="PANEL TEMP" color="amber" size={110} />
          </div>
        </Panel>
        <Panel variant="raised" title="WATER GENERATED" statusColor="blue">
          <div className="p-3 flex justify-center">
            <Gauge value={waterGenerated} min={0} max={5} unit="L/m²" label="DAILY YIELD" color="blue" size={110} decimals={2} />
          </div>
        </Panel>
        <Panel variant="raised" title="VAPOR DENSITY" statusColor="green">
          <div className="p-3 flex justify-center">
            <Gauge value={vaporDensity} min={0} max={100} unit="%" label="DESORPTION" color="green" size={110} />
          </div>
        </Panel>
        <Panel variant="carbon" title="PHASE DATA">
          <div className="p-4 space-y-3">
            <DataReadout label="SOLAR IRRADIANCE" value={solarTemp * 10.5} unit="W/m²" color="amber" />
            <DataReadout label="VAPOR FLUX" value={vaporDensity * 0.12} unit="g/m²/h" color="green" />
            <DataReadout label="ENERGY INPUT" value={solarTemp * 0.8} unit="Wh" color="amber" />
            <Toggle label="SOLAR BOOST" defaultOn={running} onChange={setRunning} />
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default DayRelease;
