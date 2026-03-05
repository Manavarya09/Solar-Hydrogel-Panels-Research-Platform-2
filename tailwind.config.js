/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary engineering palette
        'navy': {
          950: '#040d1a',
          900: '#071428',
          800: '#0d2040',
          700: '#102a54',
          600: '#153368',
          500: '#1a3d7c',
        },
        'amber': {
          solar: '#f59e0b',
          glow: '#fbbf24',
          warm: '#d97706',
          deep: '#92400e',
        },
        'water': {
          light: '#7dd3fc',
          mid: '#38bdf8',
          deep: '#0ea5e9',
          dark: '#0369a1',
          crystal: '#bae6fd',
        },
        'sand': {
          light: '#fdf6e3',
          mid: '#e8d5b0',
          warm: '#c4a47c',
          deep: '#8b6914',
        },
        'metal': {
          light: '#e2e8f0',
          silver: '#cbd5e1',
          mid: '#94a3b8',
          dark: '#475569',
          deep: '#1e293b',
          chrome: '#f1f5f9',
        },
        'carbon': {
          light: '#334155',
          mid: '#1e293b',
          dark: '#0f172a',
          fiber: '#0a1628',
        },
        'emerald': {
          active: '#10b981',
          bright: '#34d399',
          glow: '#6ee7b7',
        },
        'warning': {
          red: '#ef4444',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        'display': ['Rajdhani', 'Orbitron', 'Impact', 'system-ui', 'sans-serif'],
        'mono': ['Share Tech Mono', 'Courier New', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'label': ['Rajdhani', 'Letter Gothic Std', 'system-ui', 'sans-serif'],
        'data': ['Share Tech Mono', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'brushed-metal': `repeating-linear-gradient(
          90deg,
          rgba(255,255,255,0.025) 0px,
          rgba(255,255,255,0.025) 1px,
          transparent 1px,
          transparent 3px
        )`,
        'carbon-fiber': `
          repeating-linear-gradient(
            45deg,
            rgba(0,0,0,0.15) 0px,
            rgba(0,0,0,0.15) 1px,
            transparent 1px,
            transparent 8px
          ),
          repeating-linear-gradient(
            -45deg,
            rgba(0,0,0,0.15) 0px,
            rgba(0,0,0,0.15) 1px,
            transparent 1px,
            transparent 8px
          )
        `,
        'glass-panel': `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)`,
        'metal-gradient': `linear-gradient(180deg, #c0c8d4 0%, #8a96a8 30%, #6b7a8d 70%, #9aa4b2 100%)`,
        'dark-metal': `linear-gradient(180deg, #2a3344 0%, #1a2234 50%, #0f1724 100%)`,
      },
      boxShadow: {
        'inset-metal': 'inset 0 2px 4px rgba(0,0,0,0.6), inset 0 -1px 2px rgba(255,255,255,0.1)',
        'raised-panel': '0 4px 8px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        'deep-inset': 'inset 0 3px 8px rgba(0,0,0,0.7), inset 0 1px 3px rgba(0,0,0,0.5)',
        'glass-glow': '0 0 20px rgba(56,189,248,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        'amber-glow': '0 0 20px rgba(245,158,11,0.4), 0 0 40px rgba(245,158,11,0.2)',
        'green-led': '0 0 8px #10b981, 0 0 16px #10b981, 0 0 24px rgba(16,185,129,0.5)',
        'red-led': '0 0 8px #ef4444, 0 0 16px #ef4444, 0 0 24px rgba(239,68,68,0.5)',
        'blue-led': '0 0 8px #38bdf8, 0 0 16px #38bdf8, 0 0 24px rgba(56,189,248,0.5)',
        'amber-led': '0 0 8px #f59e0b, 0 0 16px #f59e0b, 0 0 24px rgba(245,158,11,0.5)',
        'panel-deep': '0 10px 30px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        'button-pressed': 'inset 0 3px 6px rgba(0,0,0,0.5), inset 0 1px 3px rgba(0,0,0,0.3)',
        'button-raised': '0 4px 6px rgba(0,0,0,0.4), 0 2px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
      },
      animation: {
        'pulse-led': 'pulse-led 2s ease-in-out infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'needle-swing': 'needle-swing 1s ease-out',
        'fluid-rise': 'fluid-rise 2s ease-in-out',
        'molecule-float': 'molecule-float 4s ease-in-out infinite',
        'vapor-rise': 'vapor-rise 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'data-scroll': 'data-scroll 10s linear infinite',
        'panel-open': 'panel-open 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-led': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'molecule-float': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.6' },
          '33%': { transform: 'translateY(-20px) translateX(10px)', opacity: '1' },
          '66%': { transform: 'translateY(-10px) translateX(-5px)', opacity: '0.8' },
        },
        'vapor-rise': {
          '0%': { transform: 'translateY(0)', opacity: '0.8' },
          '100%': { transform: 'translateY(-60px)', opacity: '0' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px currentColor' },
          '50%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
        'data-scroll': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'panel-open': {
          '0%': { opacity: '0', transform: 'scaleY(0.8) translateY(-10px)' },
          '100%': { opacity: '1', transform: 'scaleY(1) translateY(0)' },
        },
        'shimmer': {
          '0%, 100%': { backgroundPosition: '-200% 0' },
          '50%': { backgroundPosition: '200% 0' },
        },
        'fluid-rise': {
          '0%': { height: '0%' },
          '100%': { height: 'var(--fill-height)' },
        },
      },
    },
  },
  plugins: [],
}
