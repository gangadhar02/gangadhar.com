/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './components/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          500: '#9580ff',
        },
        neutral: {
          200: '#e5e5e5',
          700: '#404040',
          900: '#171717',
        }
      },
      animation: {
        'border-beam': 'border-beam 2s linear infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
      },
      keyframes: {
        'border-beam': {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-100%' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}