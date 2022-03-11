const { fontFamily } = require('tailwindcss/defaultTheme') // eslint-disable-line

/**
 * @type {import('tailwindcss').exports}
 */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './public/**/*.{js,ts,jsx,tsx,svg}',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      animation: {
        appear: 'appear 300ms ease-in-out',
        show: 'show 150ms ease-in-out',
      },
      colors: {},
      fontFamily: {
        sans: ['Open Sans', ...fontFamily.sans],
        plex: ['IBM Plex Sans', ...fontFamily.sans],
      },
      keyframes: {
        appear: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        show: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        text: ({ opacity }) => `0 0px 24px 0 rgba(0,0,0,${opacity})`,
        elevate1: ({ opacity }) => `0 1px 5px 0 rgba(0,0,0,${opacity})`,
        elevate0: ({ opacity }) => `0 0px 3px 0 rgba(0,0,0,${opacity})`,
      },
    },
  },
}
