import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      padding: {
        safe: 'env(safe-area-inset-bottom)',
      },
    },
    extend: {
      colors: {
        // Existing NQ palette — kept for legacy /quotient pages
        noble: {
          50:  '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // The Noble Seller (parent brand) tokens
        tns: {
          bg: '#FAFAF7',
          bgAlt: '#F2F0E8',
          fg: '#0F0F0F',
          muted: '#6B6B6B',
          border: '#E8E6DF',
          accent: '#722F37',
          accentDark: '#5A2128',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Cormorant', 'Georgia', 'serif'],
      },
      spacing: {
        'tns-xs': '4px',
        'tns-sm': '8px',
        'tns-md': '16px',
        'tns-lg': '24px',
        'tns-xl': '32px',
        'tns-2xl': '48px',
        'tns-3xl': '64px',
        'tns-4xl': '96px',
        'tns-5xl': '128px',
      },
      maxWidth: {
        prose: '760px',
        wide: '1080px',
      },
    },
  },
  plugins: [],
}

export default config
