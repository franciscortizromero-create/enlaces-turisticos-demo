/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors (mantener compatibilidad con código existente)
        navy: {
          50:  '#eef2ff',
          100: '#dde6ff',
          200: '#bbd0ff',
          300: '#94b3ff',
          400: '#6789ff',
          500: '#2952a3',
          600: '#1e3f8a',
          700: '#152d6e',
          800: '#0e1e52',
          900: '#08122e',
        },
        gold: {
          300: '#fcd34d',
          400: '#f5c842',
          500: '#e6b020',
          600: '#d4a017',
          700: '#a37510',
        },
        // Semantic tokens (light mode)
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        muted: {
          DEFAULT: 'rgb(var(--color-muted) / <alpha-value>)',
          foreground: 'rgb(var(--color-muted-foreground) / <alpha-value>)',
        },
        border: 'rgb(var(--color-border) / <alpha-value>)',
        input: 'rgb(var(--color-input) / <alpha-value>)',
        ring: 'rgb(var(--color-ring) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover:   'rgb(var(--color-primary-hover) / <alpha-value>)',
          foreground: 'rgb(var(--color-on-primary) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover:   'rgb(var(--color-accent-hover) / <alpha-value>)',
          foreground: 'rgb(var(--color-on-accent) / <alpha-value>)',
        },
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        destructive: {
          DEFAULT: 'rgb(var(--color-destructive) / <alpha-value>)',
          foreground: '#ffffff',
        },
        info: 'rgb(var(--color-info) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl':  ['3.75rem', { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg':  ['3rem',    { lineHeight: '1.2',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md':  ['2.25rem', { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm':  ['1.875rem',{ lineHeight: '1.3',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-lg':  ['1.5rem',  { lineHeight: '1.4',  fontWeight: '600' }],
        'heading-md':  ['1.25rem', { lineHeight: '1.5',  fontWeight: '600' }],
        'heading-sm':  ['1.125rem',{ lineHeight: '1.5',  fontWeight: '600' }],
        'body-lg':     ['1.125rem',{ lineHeight: '1.6' }],
        'body-md':     ['1rem',    { lineHeight: '1.6' }],
        'body-sm':     ['0.875rem',{ lineHeight: '1.5' }],
        'label':       ['0.875rem',{ lineHeight: '1.4',  fontWeight: '500' }],
        'caption':     ['0.75rem', { lineHeight: '1.4' }],
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'sm':  '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md':  '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
        'lg':  '0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
        'xl':  '0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.05)',
        'glow':'0 0 30px -8px rgb(230 176 32 / 0.45)',
        'inner-md': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-down': {
          '0%':   { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.85' },
        },
      },
      animation: {
        'fade-up':         'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':         'fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-down':       'fade-down 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in':        'scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right':  'slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer':         'shimmer 2s linear infinite',
        'pulse-subtle':    'pulse-subtle 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-expo':  'cubic-bezier(0.4, 0, 1, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
