# Solar Hydrogel Panel — Atmospheric Water Harvesting Platform

Premium interactive research & engineering dashboard built with React + TypeScript + Vite + Tailwind CSS.

## Project Overview

This is a premium skeuomorphic engineering interface for the Solar Hydrogel Atmospheric Water Harvesting (AWH) project. It simulates a real hardware control system dashboard with tactile UI, animated gauges, live metrics, and interactive schematics.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite 7
- **Styling**: Tailwind CSS 3 (custom engineering design tokens)
- **Animation**: Framer Motion (mechanical transitions, gauge needles, LEDs)
- **State**: Local React state (no external state manager needed)
- **Icons**: Custom SVG (no icon pack)

## Design Language

- **Skeuomorphic** — brushed aluminum textures, carbon fiber panels, glass modules
- **Engineering instruments** — analog gauges, digital readouts, LED indicators, toggle switches, rotary dials
- **Color system**: Deep Navy (background), Solar Amber, Water Blue, Sand Beige
- **Typography**: Rajdhani (condensed engineering headings), Share Tech Mono (digital displays), Inter (body)

## Project Structure

```
src/
  App.tsx                          # Main navigation & layout
  index.css                        # Global skeuomorphic styles, textures, animations
  components/
    ui/
      Panel.tsx                    # Skeuomorphic panel container + MetalScrew
      LED.tsx                      # LED indicator lights (green/amber/blue/red/off)
      Gauge.tsx                    # Analog SVG gauge with animated needle
      Toggle.tsx                   # Physical toggle switch + PhysicalButton
      Dial.tsx                     # Rotary knob dial
      DigitalDisplay.tsx           # LED/LCD digital readout + DataReadout
    dashboard/
      ControlPanel.tsx             # Main overview hero — live metrics, gauges, controls
      SystemArchitecture.tsx       # Layer schematic with interactive module cards
      MaterialScience.tsx          # Material cards with microstructure SVGs
      PerformanceDashboard.tsx     # Gauge bank + historical charts
      Applications.tsx             # Real-world deployment scenarios
      PrototypeViewer.tsx          # CAD blueprint schematic
      ImplementationRoadmap.tsx    # Phase timeline with progress tracking
    simulation/
      NightAbsorption.tsx          # Night cycle moisture capture visualization
      DayRelease.tsx               # Solar day vapor release visualization
```

## Navigation Sections

1. **OVERVIEW** — Live control panel with system status, gauges, reservoir level, alerts
2. **SYSTEM ARCHITECTURE** — 7-layer panel schematic with clickable module inspection
3. **NIGHT ABSORPTION** — Animated moisture capture cycle (20:00–06:00)
4. **DAY RELEASE** — Solar-driven vapor desorption and water collection
5. **MATERIALS ENG.** — Hydrogel, MOF, photothermal, surface coating specifications
6. **PERFORMANCE** — Real-time gauges + 24-hour historical charts
7. **APPLICATIONS** — Residential, greenhouse, desert, emergency, infrastructure
8. **PROTOTYPE** — CAD-style blueprint with dimensions and cross-sections
9. **ROADMAP** — 4-phase implementation timeline

## Build Commands

```bash
npm install
npm run build    # Production build
npm run dev      # Development server
```

## Key Features

- All metrics update in real-time via `setInterval` React state
- Framer Motion powers needle animations, gauge fills, LED pulse, tab transitions
- SVG-based gauges with animated needles (spring physics)
- Interactive module cards expand with tech specs on click
- Night/Day cycle simulations with animated particles
- Blueprint view with dimension annotations
- Ticker tape system status display
- Alarm system with threshold-based LED state
