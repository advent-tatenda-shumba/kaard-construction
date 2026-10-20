/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kaard: {
          navy: '#0F2C52',
          'navy-dark': '#091B33',
          'navy-light': '#1A4375',
          steel: '#58595B',
          'steel-light': '#8A8C8E',
          'steel-muted': '#D1D5DB',
          orange: '#E87722',
          'orange-hover': '#CF6415',
          'orange-glow': 'rgba(232, 119, 34, 0.25)',
          stone: '#F6F5F2',
          'stone-pure': '#FAF9F6',
          'stone-card': '#FFFFFF',
          'stone-border': 'rgba(15, 44, 82, 0.08)',
          carbon: '#0B0C0E',
          'carbon-surface': '#121418',
          'carbon-card': '#181B21',
          'carbon-border': '#22262E',
        }
      },
      fontFamily: {
        editorial: ['"Newsreader"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.02em',
        'widest-tech': '0.15em',
      },
      boxShadow: {
        'architectural': '0 20px 40px -15px rgba(15, 44, 82, 0.07)',
        'architectural-lg': '0 30px 60px -20px rgba(15, 44, 82, 0.12)',
        'carbon-glow': '0 10px 30px -10px rgba(232, 119, 34, 0.15)',
      },
      animation: {
        'kenburns': 'kenburns 16s ease infinite alternate',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
