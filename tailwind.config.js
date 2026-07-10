/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        trilha: {
          bg: '#0a0a0f',
          surface: '#12121a',
          border: 'rgba(255,255,255,0.08)',
          purple: {
            400: '#a78bfa',
            500: '#8b5cf6',
            600: '#7c3aed',
          },
          blue: {
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
          },
          cyan: {
            400: '#22d3ee',
            500: '#06b6d4',
          },
          text: {
            primary: '#f1f5f9',
            secondary: '#94a3b8',
            muted: '#64748b',
          },
        },
      },
      animation: {
        drift: 'drift 6s ease-in-out infinite',
        'drift-slow': 'drift 10s ease-in-out infinite 1s',
        'drift-slower': 'drift 8s ease-in-out infinite 2s',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(10px, -15px) scale(1.05)' },
          '50%': { transform: 'translate(-5px, 10px) scale(0.95)' },
          '75%': { transform: 'translate(-15px, -5px) scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
