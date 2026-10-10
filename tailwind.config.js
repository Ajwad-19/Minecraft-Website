/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#080B0D',
        panel: '#10161A',
        panel2: '#161E23',
        edge: '#26323A',
        grass: '#55FF55',
        grassdark: '#2E8B3C',
        sky: '#29B6F6',
        skydark: '#1565C0',
        snow: '#F5F5F5',
        stone: '#AAB2B8',
        dirt: '#7A5230',
        dirtdark: '#5A3A20',
      },
      fontFamily: {
        // Press Start 2P: tiny labels only. Pixelify Sans: headings and numbers. Geist: body text.
        pixel: ['"Press Start 2P"', 'monospace'],
        display: ['"Pixelify Sans"', '"Press Start 2P"', 'monospace'],
        sans: ['"Geist Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 24px rgba(85,255,85,0.35)',
        'glow-blue': '0 0 24px rgba(41,182,246,0.35)',
        block: 'inset -4px -4px 0 rgba(0,0,0,0.35), inset 4px 4px 0 rgba(255,255,255,0.15)',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(8deg)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(85,255,85,0.6)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 0 6px rgba(85,255,85,0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'pulse-dot': 'pulseDot 1.8s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
