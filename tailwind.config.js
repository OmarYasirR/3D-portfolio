/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      lineClamp: {
        2: '2',
        3: '3',
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        'primary': '#00abf0',
        'secondary': '#006e9a',
        'dark': '#151f28',
        'light': '#f8fafc',
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'comic': ['Comic Relief', 'cursive'],
      },
      animation: {
        'show-book': 'show-animate 2s forwards',
      },
      keyframes: {
        'show-animate': {
          '0%, 30%': {
            opacity: '0',
            transform: 'rotate(-20deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'rotate(0deg)',
          },
        },
      },
      perspective: {
        '250': '250rem',
      },
      backfaceVisibility: {
        'visible': 'visible',
        'hidden': 'hidden',
      },
      transformStyle: {
        'flat': 'flat',
        'preserve-3d': 'preserve-3d',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
        'y-[-180deg]': 'rotateY(-180deg)',
      },
      transitionTimingFunction: {
        'cubic-bezier': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
    },
  },
  plugins: [
  ],
} 