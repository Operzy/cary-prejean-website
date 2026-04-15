export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        surface: '#FFFFFF',
        surfaceHover: '#F1F5F9',
        textMain: '#0F172A',
        textMuted: '#475569',
        primary: '#0B1E36', // Navy Blue
        accent: '#2563EB', // Royal Blue
        accentLight: '#60A5FA',
        accentGold: '#D4AF37', // Gold for subtle contrast
        borderLight: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        drama: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
