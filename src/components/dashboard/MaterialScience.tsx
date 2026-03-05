import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Panel, SectionHeader } from '../ui/Panel';
import { LED } from '../ui/LED';

const materials = [
  {
    id: 'hydrogel',
    category: 'HYDROGELS',
    name: 'Super-Absorbent Polymer Network',
    formula: 'PAAm-co-PAA / LiCl doped',
    color: '#38bdf8',
    borderColor: 'rgba(56,189,248,0.3)',
    specs: [
      { k: 'Absorption Capacity', v: '3.2 kg H₂O / kg dry' },
      { k: 'Humidity Threshold', v: '20% RH (onset)' },
      { k: 'Cycle Durability', v: '>2000 cycles' },
      { k: 'Desorption Temp.', v: '55–80°C' },
    ],
    description: 'Polyacrylamide-co-polyacrylic acid interpenetrating network with lithium chloride dopant enhances hygroscopic moisture capture. Cross-linked polymer chains swell 300× their dry volume in high humidity environments.',
    microstructure: 'Polymer mesh / 2–8 nm pore network',
    structureColor: 'rgba(56,189,248,0.15)',
  },
  {
    id: 'mof',
    category: 'METAL-ORGANIC FRAMEWORKS',
    name: 'MOF-801 / MOF-303 Composite',
    formula: 'Zr₆O₄(OH)₄(fumarate)₆',
    color: '#a78bfa',
    borderColor: 'rgba(167,139,250,0.3)',
    specs: [
      { k: 'BET Surface Area', v: '1,200–4,000 m²/g' },
      { k: 'Pore Diameter', v: '3–8 Å (molecular sieve)' },
      { k: 'Working Capacity', v: '0.25 g/g at 20% RH' },
      { k: 'Regeneration Temp.', v: '65°C (solar-driven)' },
    ],
    description: 'Zirconium-based metal-organic framework with ultra-high surface area provides molecular-scale water adsorption sites. Hydrophilic pore lining enables low-humidity capture not achievable by silica or zeolite sorbents.',
    microstructure: 'Crystalline cage structure / ordered pore channels',
    structureColor: 'rgba(167,139,250,0.15)',
  },
  {
    id: 'thermal',
    category: 'PHOTOTHERMAL MATERIALS',
    name: 'Plasmonic Solar Absorber Composite',
    formula: 'TiN / Ti₂O₃ + Carbon-Black nanoparticles',
    color: '#f59e0b',
    borderColor: 'rgba(245,158,11,0.3)',
    specs: [
      { k: 'Solar Absorptivity', v: '96.4%' },
      { k: 'Thermal Emittance', v: '0.04 (low-E coating)' },
      { k: 'Operating Temp.', v: '25–95°C' },
      { k: 'Spectral Range', v: '250–2500 nm (full solar)' },
    ],
    description: 'Titanium nitride plasmonic nanoparticles combined with carbon black matrix achieve near-unity solar absorption across the full atmospheric transmission window. Selective thermal emitter reduces parasitic heat loss.',
    microstructure: 'Nanoparticle dispersion / plasmonic lattice',
    structureColor: 'rgba(245,158,11,0.15)',
  },
  {
    id: 'condensation',
    category: 'SURFACE ENGINEERING',
    name: 'Superhydrophilic Condensation Surface',
    formula: 'SiO₂ nanoparticle / TiO₂ photocatalyst film',
    color: '#10b981',
    borderColor: 'rgba(16,185,129,0.3)',
    specs: [
      { k: 'Contact Angle', v: '< 5° (superhydrophilic)' },
      { k: 'Droplet Departure', v: '< 0.8 mm diameter' },
      { k: 'Heat Transfer', v: '45 kW/m²·K' },
      { k: 'Anti-fouling', v: 'UV photocatalytic self-cleaning' },
    ],
    description: 'Spray-coated silica nanoparticle film creates nanoscale surface roughness promoting film condensation rather than dropwise. TiO₂ photocatalytic layer provides UV-driven self-cleaning and anti-bacterial action.',
    microstructure: 'Nanoparticle array / hierarchical wettability',
    structureColor: 'rgba(16,185,129,0.15)',
  },
];

const MaterialScience: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedMat = materials.find(m => m.id === selected);

  return (
    <div className="space-y-4">
      <SectionHeader title="MATERIALS ENGINEERING" subtitle="FUNCTIONAL MATERIAL CHARACTERIZATION" statusColor="green" />

      <div className="grid grid-cols-2 gap-3">
        {materials.map(mat => (
          <motion.div
            key={mat.id}
            onClick={() => setSelected(selected === mat.id ? null : mat.id)}
            className="cursor-pointer rounded-md overflow-hidden"
            style={{
              background: selected === mat.id ? mat.structureColor : 'linear-gradient(180deg, #1e2d42 0%, #0d1825 100%)',
              border: `1px solid ${selected === mat.id ? mat.color : 'rgba(255,255,255,0.07)'}`,
              boxShadow: selected === mat.id ? `0 0 20px ${mat.color}20` : 'none',
            }}
            whileHover={{ scale: 1.005 }}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-label text-[10px] mb-0.5" style={{ color: mat.color }}>{mat.category}</div>
                  <h3 className="font-engineering text-sm text-white/90">{mat.name}</h3>
                  <div className="font-mono text-[10px] text-slate-500 mt-0.5">{mat.formula}</div>
                </div>
                <LED color={selected === mat.id ? 'green' : 'off'} />
              </div>

              {/* Microstructure SVG visualization */}
              <div className="relative rounded overflow-hidden my-2" style={{ height: 60, background: 'rgba(0,0,0,0.3)' }}>
                <svg viewBox="0 0 300 60" className="w-full h-full">
                  {mat.id === 'hydrogel' && (
                    <>
                      {/* Polymer mesh */}
                      {Array.from({ length: 6 }, (_, i) => (
                        <path key={i}
                          d={`M ${i * 50} 0 C ${i * 50 + 15} 20, ${i * 50 + 30} 40, ${i * 50 + 50} 60`}
                          fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="1.5" />
                      ))}
                      {Array.from({ length: 4 }, (_, i) => (
                        <path key={i}
                          d={`M 0 ${i * 20} C 75 ${i * 20 - 10}, 150 ${i * 20 + 10}, 300 ${i * 20}`}
                          fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                      ))}
                      {Array.from({ length: 8 }, (_, i) => (
                        <circle key={i} cx={40 + i * 32} cy={30 + (i % 2 === 0 ? -10 : 10)}
                          r="4" fill="rgba(56,189,248,0.5)" />
                      ))}
                    </>
                  )}
                  {mat.id === 'mof' && (
                    <>
                      {/* Crystal lattice */}
                      {Array.from({ length: 6 }, (_, i) =>
                        Array.from({ length: 3 }, (_, j) => (
                          <rect key={`${i}-${j}`} x={20 + i * 50} y={10 + j * 20} width={16} height={14}
                            fill="none" stroke="rgba(167,139,250,0.4)" strokeWidth="1" rx="1" />
                        ))
                      )}
                      {Array.from({ length: 6 }, (_, i) => (
                        <circle key={i} cx={28 + i * 50} cy="17" r="3"
                          fill="rgba(167,139,250,0.6)" />
                      ))}
                    </>
                  )}
                  {mat.id === 'thermal' && (
                    <>
                      {/* Nanoparticle scatter */}
                      {Array.from({ length: 20 }, (_, i) => (
                        <circle key={i}
                          cx={(i * 73 + 20) % 280 + 10}
                          cy={(i * 47 + 15) % 40 + 10}
                          r={2 + (i % 3)}
                          fill={`rgba(245,158,11,${0.3 + (i % 3) * 0.2})`}
                        />
                      ))}
                      {/* Heat waves */}
                      {[0, 1, 2].map(i => (
                        <motion.path key={i}
                          d={`M ${80 + i * 60} 55 Q ${100 + i * 60} 45 ${120 + i * 60} 55`}
                          fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                        />
                      ))}
                    </>
                  )}
                  {mat.id === 'condensation' && (
                    <>
                      {/* Nanoparticle surface */}
                      {Array.from({ length: 16 }, (_, i) => (
                        <circle key={i} cx={10 + i * 18} cy="45" r="6"
                          fill="rgba(16,185,129,0.3)" stroke="rgba(16,185,129,0.4)" strokeWidth="1" />
                      ))}
                      {/* Water droplets forming */}
                      {[1, 2, 3, 4, 5].map(i => (
                        <ellipse key={i} cx={30 + i * 50} cy="25" rx="8" ry="12"
                          fill="rgba(56,189,248,0.4)" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
                      ))}
                    </>
                  )}
                  <text x="150" y="58" textAnchor="middle" fill={`${mat.color}60`}
                    style={{ fontFamily: 'Rajdhani', fontSize: 7, letterSpacing: '0.1em' }}>
                    {mat.microstructure}
                  </text>
                </svg>
              </div>

              <AnimatePresence>
                {selected === mat.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-400 text-xs leading-relaxed mb-3">{mat.description}</p>
                    <div className="space-y-1">
                      {mat.specs.map(spec => (
                        <div key={spec.k} className="flex justify-between py-0.5 border-b border-white/5">
                          <span className="font-label text-[10px] text-slate-500">{spec.k}</span>
                          <span className="font-mono text-xs" style={{ color: mat.color }}>{spec.v}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MaterialScience;
