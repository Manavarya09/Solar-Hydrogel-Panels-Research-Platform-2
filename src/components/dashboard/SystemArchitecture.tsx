import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Panel, SectionHeader, MetalScrew } from '../ui/Panel';
import { LED } from '../ui/LED';

interface ModuleData {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  borderColor: string;
  status: 'active' | 'standby' | 'charging';
  specs: { key: string; value: string }[];
  description: string;
  position: number;
}

const modules: ModuleData[] = [
  {
    id: 'hydrogel',
    title: 'HYDROGEL ABSORPTION LAYER',
    subtitle: 'MOF-COMPOSITE MATRIX',
    color: 'rgba(14,165,233,0.15)',
    borderColor: '#0ea5e9',
    status: 'active',
    position: 1,
    specs: [
      { key: 'Thickness', value: '8 mm' },
      { key: 'Composition', value: 'PAAm-PAA / MOF-801' },
      { key: 'Absorption Rate', value: '3.2 kg H₂O / kg' },
      { key: 'Pore Size', value: '2.4 nm avg' },
      { key: 'Surface Area', value: '1,200 m²/g' },
    ],
    description: 'Super-absorbent polymer network interpenetrated with Metal-Organic Framework crystals. Captures atmospheric moisture at humidities as low as 20% RH through capillary condensation and chemisorption pathways.',
  },
  {
    id: 'solar',
    title: 'PHOTOTHERMAL ABSORBER',
    subtitle: 'SOLAR HEATING LAYER',
    color: 'rgba(245,158,11,0.15)',
    borderColor: '#f59e0b',
    status: 'active',
    position: 2,
    specs: [
      { key: 'Absorptivity', value: '96.4%' },
      { key: 'Material', value: 'Carbon Black + Ti₂O₃' },
      { key: 'Peak Temp', value: '85°C' },
      { key: 'Emissivity', value: '0.04 (low-E)' },
      { key: 'Thickness', value: '0.5 mm' },
    ],
    description: 'Broadband solar absorber utilizing plasmonic carbon nanoparticles and titanium dioxide composite. Achieves near-unity solar absorption while minimizing thermal re-emission through selective emitter design.',
  },
  {
    id: 'vapor',
    title: 'VAPOR TRANSFER CHANNEL',
    subtitle: 'MICRO-CHANNEL ARRAY',
    color: 'rgba(16,185,129,0.15)',
    borderColor: '#10b981',
    status: 'active',
    position: 3,
    specs: [
      { key: 'Channel Width', value: '50 µm' },
      { key: 'Channel Depth', value: '30 µm' },
      { key: 'Array Density', value: '400/cm²' },
      { key: 'Material', value: 'Anodized Al₂O₃' },
      { key: 'Flow Rate', value: '12 mL/h/cm²' },
    ],
    description: 'Precision-etched micro-channel network directs desorbed water vapor from the hydrogel matrix toward the condensation surface. Hydrophilic surface treatment ensures preferential vapor transport.',
  },
  {
    id: 'condensation',
    title: 'CONDENSATION SURFACE',
    subtitle: 'HYDROPHILIC COLLECTOR',
    color: 'rgba(125,211,252,0.15)',
    borderColor: '#7dd3fc',
    status: 'active',
    position: 4,
    specs: [
      { key: 'Contact Angle', value: '< 5°' },
      { key: 'Coating', value: 'SiO₂ nanofilm' },
      { key: 'Substrate', value: 'Copper-alloy' },
      { key: 'Fin Density', value: '32 fins/inch' },
      { key: 'Efficiency', value: '91%' },
    ],
    description: 'Superhydrophilic copper surface with thermally-sprayed silica nanoparticle coating promotes rapid condensation and droplet coalescence. Gravity-assisted drainage channels direct water to collection system.',
  },
  {
    id: 'collection',
    title: 'WATER COLLECTION CHANNEL',
    subtitle: 'MICRO-GRAVITY DRAINAGE',
    color: 'rgba(56,189,248,0.15)',
    borderColor: '#38bdf8',
    status: 'active',
    position: 5,
    specs: [
      { key: 'Tilt Angle', value: '5–15°' },
      { key: 'Flow Capacity', value: '10 mL/min' },
      { key: 'Material', value: 'Food-grade HDPE' },
      { key: 'Filter Rating', value: '0.2 µm' },
      { key: 'Pre-filter', value: 'Activated Carbon' },
    ],
    description: 'Gravity-fed collection network harvests condensed water droplets and routes them through a pre-filtration stage before storage. Micro-scale channels prevent evaporative losses during collection.',
  },
  {
    id: 'storage',
    title: 'STORAGE TANK MODULE',
    subtitle: 'SEALED RESERVOIR SYSTEM',
    color: 'rgba(100,116,139,0.15)',
    borderColor: '#64748b',
    status: 'standby',
    position: 6,
    specs: [
      { key: 'Capacity', value: '50 L' },
      { key: 'Material', value: 'Food-grade SS 316L' },
      { key: 'Pressure Rating', value: '2 bar' },
      { key: 'Insulation', value: 'Vacuum-jacketed' },
      { key: 'Sensor', value: 'Ultrasonic level' },
    ],
    description: 'Vacuum-jacketed stainless steel reservoir maintains water quality and prevents thermal losses. Integrated ultrasonic level sensing provides real-time volume monitoring via the control interface.',
  },
  {
    id: 'uv',
    title: 'UV STERILIZATION MODULE',
    subtitle: 'PATHOGEN ELIMINATION',
    color: 'rgba(167,139,250,0.15)',
    borderColor: '#a78bfa',
    status: 'charging',
    position: 7,
    specs: [
      { key: 'UV Wavelength', value: '254 nm (UV-C)' },
      { key: 'Lamp Life', value: '9,000 hrs' },
      { key: 'Log Reduction', value: '99.99% bacteria' },
      { key: 'Flow Rate', value: '5 L/min' },
      { key: 'Power Draw', value: '14W' },
    ],
    description: 'UV-C germicidal lamp delivers 30 mJ/cm² dosage for 4-log reduction of bacterial and viral contaminants. Solar-charged supercapacitor bank enables operation during nighttime distribution.',
  },
];

const statusColors = {
  active: 'green' as const,
  standby: 'amber' as const,
  charging: 'blue' as const,
};

const SystemArchitecture: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const selected = modules.find(m => m.id === selectedModule);

  return (
    <div className="space-y-4">
      <SectionHeader
        title="SYSTEM ARCHITECTURE"
        subtitle="HYDROGEL AWH PANEL — LAYER SCHEMATIC"
        statusColor="blue"
      />

      {/* Layer Stack Visualization */}
      <div className="relative schematic-grid rounded-md overflow-hidden p-4"
        style={{ background: 'linear-gradient(180deg, #030e1c 0%, #060e1f 100%)', border: '1px solid rgba(56,189,248,0.1)' }}>
        <div className="absolute top-2 left-2">
          <div className="engraved-label text-[9px]">CROSS-SECTION SCHEMATIC — SCALE 1:4</div>
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          <div className="engraved-label text-[9px]">DWG: SHP-AWH-004</div>
          <div className="engraved-label text-[9px]">REV: C</div>
        </div>

        <div className="mt-6 space-y-1.5">
          {modules.slice(0, 5).map((mod) => (
            <motion.div
              key={mod.id}
              onClick={() => setSelectedModule(selectedModule === mod.id ? null : mod.id)}
              className="relative rounded cursor-pointer transition-all"
              style={{
                background: selectedModule === mod.id ? mod.color : 'rgba(255,255,255,0.02)',
                border: `1px solid ${selectedModule === mod.id ? mod.borderColor : 'rgba(255,255,255,0.06)'}`,
                boxShadow: selectedModule === mod.id ? `0 0 16px ${mod.borderColor}20, inset 0 0 30px ${mod.color}` : 'none',
              }}
              whileHover={{ scale: 1.005, backgroundColor: mod.color }}
              whileTap={{ scale: 0.998 }}
            >
              <div className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <LED color={statusColors[mod.status]} size="sm" pulsing={mod.status === 'active'} />
                  <div>
                    <div className="font-engineering text-xs" style={{ color: mod.borderColor }}>{mod.title}</div>
                    <div className="engraved-label text-[10px]">{mod.subtitle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-slate-500">LAYER {mod.position}</span>
                  <motion.div
                    animate={{ rotate: selectedModule === mod.id ? 90 : 0 }}
                    className="w-3 h-3 flex items-center justify-center"
                  >
                    <svg viewBox="0 0 8 8" width="8" height="8">
                      <polyline points="2,1 6,4 2,7" fill="none" stroke="rgba(100,116,139,0.6)" strokeWidth="1.5" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Module Detail Drawer */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="overflow-hidden"
          >
            <Panel variant="raised">
              <div className="p-4 grid grid-cols-12 gap-4">
                <div className="col-span-8">
                  <div className="flex items-center gap-2 mb-3">
                    <LED color={statusColors[selected.status]} pulsing={selected.status === 'active'} />
                    <h3 className="font-engineering text-sm" style={{ color: selected.borderColor }}>
                      {selected.title}
                    </h3>
                    <span className="engraved-label ml-2">— {selected.status.toUpperCase()}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">{selected.description}</p>
                </div>
                <div className="col-span-4">
                  <div className="engraved-label text-[10px] mb-2">TECHNICAL SPECIFICATIONS</div>
                  <div className="space-y-1">
                    {selected.specs.map(spec => (
                      <div key={spec.key} className="flex justify-between items-center py-0.5 border-b border-white/5">
                        <span className="font-label text-[10px] text-slate-500">{spec.key}</span>
                        <span className="font-mono text-xs" style={{ color: selected.borderColor }}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Modules */}
      <div className="grid grid-cols-2 gap-3">
        {modules.slice(5).map(mod => (
          <Panel key={mod.id} variant="carbon">
            <div
              className="p-4 cursor-pointer"
              onClick={() => setSelectedModule(selectedModule === mod.id ? null : mod.id)}
              style={{
                borderLeft: `3px solid ${mod.borderColor}`,
                background: selectedModule === mod.id ? mod.color : 'transparent',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LED color={statusColors[mod.status]} size="sm" pulsing={mod.status === 'active'} />
                  <div>
                    <div className="font-engineering text-xs" style={{ color: mod.borderColor }}>{mod.title}</div>
                    <div className="engraved-label text-[10px]">{mod.subtitle}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <MetalScrew />
                  <MetalScrew />
                </div>
              </div>
              {selectedModule === mod.id && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
                  <p className="text-slate-400 text-xs leading-relaxed mb-2">{mod.description}</p>
                  <div className="grid grid-cols-2 gap-1">
                    {mod.specs.map(spec => (
                      <div key={spec.key} className="flex justify-between text-[10px] border-b border-white/5 py-0.5">
                        <span className="text-slate-500 font-label">{spec.key}</span>
                        <span className="font-mono" style={{ color: mod.borderColor }}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
};

export default SystemArchitecture;
