/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef2ff',
          100: '#dde6ff',
          200: '#bbd0ff',
          500: '#2952a3',
          600: '#1e3f8a',
          700: '#152d6e',
          800: '#0e1e52',
          900: '#08122e',
        },
        gold: {
          400: '#f5c842',
          500: '#e6b020',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
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
      },
      animation: {
        'fade-up':   'fade-up 0.6s ease-out forwards',
        'fade-in':   'fade-in 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}
