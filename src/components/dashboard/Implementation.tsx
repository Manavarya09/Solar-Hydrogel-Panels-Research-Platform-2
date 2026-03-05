import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Panel, SectionHeader } from '../ui/Panel';
import { LED } from '../ui/LED';

const phases = [
  {
    id: 1,
    phase: 'PHASE I',
    title: 'Research & Material Selection',
    duration: 'Q1–Q2 2025',
    status: 'completed',
    color: '#10b981',
    tasks: [
      'Literature review: AWH sorbent materials',
      'MOF synthesis and characterization',
      'Hydrogel formulation screening',
      'Photothermal material optimization',
      'Computational humidity modeling',
    ],
    deliverables: ['Material spec sheet', 'Lab test report', 'IP landscape analysis'],
  },
  {
    id: 2,
    phase: 'PHASE II',
    title: 'Engineering Design & Simulation',
    duration: 'Q3–Q4 2025',
    status: 'completed',
    color: '#38bdf8',
    tasks: [
      'CAD panel geometry optimization',
      'CFD airflow simulation',
      'Thermal finite element analysis',
      'Micro-channel array design',
      'System integration architecture',
    ],
    deliverables: ['Design drawings (DWG)', 'CFD simulation report', 'Fabrication spec'],
  },
  {
    id: 3,
    phase: 'PHASE III',
    title: 'Prototype Fabrication',
    duration: 'Q1–Q2 2026',
    status: 'active',
    color: '#f59e0b',
    tasks: [
      'Frame CNC machining (Al 6061-T6)',
      'Hydrogel casting and curing',
      'Solar absorber layer deposition',
      'Micro-channel etching and assembly',
      'System integration and sealing',
    ],
    deliverables: ['Rev-4.2 prototype (5 units)', 'Assembly manual', 'Initial test data'],
  },
  {
    id: 4,
    phase: 'PHASE IV',
    title: 'Field Testing — Desert Conditions',
    duration: 'Q3 2026',
    status: 'pending',
    color: '#ef4444',
    tasks: [
      'Site preparation: Sahara test station',
      '30-day continuous operation',
      'Humidity range validation (20–80% RH)',
      'Degradation and durability analysis',
      'Water quality testing (WHO standards)',
    ],
    deliverables: ['Field test report', 'Performance certification', 'Peer review submission'],
  },
];

const statusColors = {
  completed: 'green' as const,
  active: 'amber' as const,
  pending: 'off' as const,
};

const ImplementationRoadmap: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(3);

  return (
    <div className="space-y-4">
      <SectionHeader title="IMPLEMENTATION ROADMAP" subtitle="PROJECT TIMELINE — SOLAR HYDROGEL AWH PLATFORM" statusColor="amber" />

      {/* Timeline track */}
      <Panel variant="inset" className="p-4 relative">
        {/* Timeline rail */}
        <div className="relative">
          {/* Connecting rail */}
          <div className="absolute top-7 left-8 right-8 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #10b981 0%, #10b981 45%, #f59e0b 50%, #334155 70%, #334155 100%)' }} />

          <div className="grid grid-cols-4 gap-2 relative">
            {phases.map((phase, i) => (
              <div key={phase.id} className="flex flex-col items-center gap-3">
                {/* Phase node */}
                <motion.div
                  onClick={() => setSelected(selected === phase.id ? null : phase.id)}
                  className="relative cursor-pointer z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-engineering text-xs"
                    style={{
                      background: phase.status === 'pending'
                        ? 'linear-gradient(145deg, #1e2d42, #0d1825)'
                        : `linear-gradient(145deg, ${phase.color}40, ${phase.color}15)`,
                      border: `2px solid ${phase.status === 'pending' ? 'rgba(71,85,105,0.5)' : phase.color}`,
                      boxShadow: phase.status !== 'pending'
                        ? `0 0 15px ${phase.color}30, inset 0 1px 0 rgba(255,255,255,0.1)`
                        : 'inset 0 2px 4px rgba(0,0,0,0.4)',
                      color: phase.status === 'pending' ? 'rgba(71,85,105,0.6)' : phase.color,
                    }}
                  >
                    {phase.status === 'completed' ? (
                      <svg viewBox="0 0 16 16" width="16" height="16" fill={phase.color}>
                        <path d="M13.5 2.5L6 10 2.5 6.5 1 8l5 5L15 4z" />
                      </svg>
                    ) : (
                      <span>{phase.id}</span>
                    )}
                  </div>
                  {phase.status === 'active' && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid ${phase.color}`, }}
                      animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Phase label */}
                <div className="text-center">
                  <div className="font-engineering text-xs" style={{ color: phase.color }}>{phase.phase}</div>
                  <div className="font-label text-[10px] text-center mt-0.5" style={{ color: 'rgba(148,163,184,0.7)' }}>
                    {phase.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* Phase detail cards */}
      <div className="grid grid-cols-2 gap-3">
        {phases.map(phase => (
          <motion.div
            key={phase.id}
            onClick={() => setSelected(selected === phase.id ? null : phase.id)}
            className="cursor-pointer rounded-md overflow-hidden"
            style={{
              background: selected === phase.id
                ? `linear-gradient(135deg, ${phase.color}12 0%, rgba(13,24,37,0.95) 100%)`
                : 'linear-gradient(135deg, rgba(21,31,48,0.9) 0%, rgba(13,24,37,0.95) 100%)',
              border: `1px solid ${selected === phase.id ? phase.color + '50' : 'rgba(255,255,255,0.07)'}`,
            }}
            whileHover={{ scale: 1.002 }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <LED color={statusColors[phase.status]} pulsing={phase.status === 'active'} size="sm" />
                  <div>
                    <span className="font-engineering text-xs" style={{ color: phase.color }}>{phase.phase}</span>
                    <span className="engraved-label ml-2">— {phase.status.toUpperCase()}</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-slate-600">{phase.duration}</span>
              </div>

              <h3 className="font-engineering text-sm text-white/90 mb-2">{phase.title}</h3>

              {selected === phase.id && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="engraved-label text-[9px] mb-1">KEY TASKS</div>
                      <div className="space-y-1">
                        {phase.tasks.map((task, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[10px] text-slate-400">
                            <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                              style={{ background: phase.color }} />
                            {task}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="engraved-label text-[9px] mb-1">DELIVERABLES</div>
                      <div className="space-y-1">
                        {phase.deliverables.map((d, i) => (
                          <div key={i} className="text-[10px] font-mono" style={{ color: `${phase.color}90` }}>
                            [{i + 1}] {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Progress bar */}
              <div className="mt-2 h-0.5 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: phase.color }}
                  initial={{ width: 0 }}
                  animate={{
                    width: phase.status === 'completed' ? '100%' : phase.status === 'active' ? '45%' : '0%'
                  }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImplementationRoadmap;
