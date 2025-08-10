/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Theme colors
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        hover: 'var(--hover)',
        command: 'var(--command)',
        
        // Accent colors
        yellow: 'var(--yellow)',
        pink: 'var(--pink)',
        purple: 'var(--purple)',
        red: 'var(--red)',
        orange: 'var(--orange)',
        green: 'var(--green)',
        cyan: 'var(--cyan)',
        
        // Component colors
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        highlight: 'var(--highlight)',
      },
      fontFamily: {
        body: ['Biotif', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
        heading: ['Neuzeit Grotesk Bold', 'sans-serif'],
        sans: ['Biotif', 'sans-serif'],
      },
      spacing: {
        'nav-height-desktop': '60px',
        'nav-height-mobile': '120px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      screens: {
        'bp1': '425px',
        'bp2': '760px',
        'bp3': { 'max': '780px' },
        'bp4': { 'max': '1024px' },
      },
      animation: {
        'border-beam': 'border-beam 2s linear infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-out': 'fade-out 0.5s ease-in-out',
        'slide-in': 'slide-up-fade 100ms ease-in forwards',
        'slide-out': 'slide-down-fade 100ms ease-in forwards',
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
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-out': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-10px)', opacity: '0' },
        },
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(20px)' },
        },
      },
    },
  },
  plugins: [],
}