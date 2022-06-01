const { fontFamily } = require('tailwindcss/defaultTheme') // eslint-disable-line

/**
 * @type {import('tailwindcss')}
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
      boxShadow: {
        text: ({ opacity }) => `0 0px 24px 0 rgba(0,0,0,${opacity})`,
        elevate1: ({ opacity }) => `0 1px 5px 0 rgba(0,0,0,${opacity})`,
        elevate0: ({ opacity }) => `0 0px 3px 0 rgba(0,0,0,${opacity})`,
      },
      fontFamily: {
        sans: ['Open Sans', ...fontFamily.sans],
        plex: ['IBM Plex Sans', ...fontFamily.sans],
      },
      fontSize: {
        xxs: [
          '.625rem',
          {
            lineHeight: '1.5',
          },
        ],
        body: [
          'calc(14px + 4 * ((100vw - 320px) / 1280))',
          {
            lineHeight: '1.5',
          },
        ],
        description: [
          'calc(10px + 4 * ((100vw - 320px) / 1280))',
          {
            lineHeight: '',
          },
        ],
        heading0: [
          'calc(72px + 72 * ((100vw - 320px) / 1280))',
          {
            letterSpacing: '-0.05em',
            lineHeight: '0.86666',
          },
        ],
        heading1: [
          'calc(48px + 48 * ((100vw - 320px) / 1280))',
          {
            letterSpacing: '-0.05em',
            lineHeight: '0.86666',
          },
        ],
        heading2: [
          'calc(34px + 34 * ((100vw - 320px) / 1280))',
          {
            letterSpacing: '-0.05em',
            lineHeight: '0.86666',
          },
        ],
        heading3: [
          'calc(30px + 18 * ((100vw - 320px) / 1280))',
          {
            letterSpacing: '-0.05em',
            lineHeight: '0.86666',
          },
        ],
        heading4: [
          'calc(24px + 8 * ((100vw - 320px) / 1280))',
          {
            letterSpacing: '-0.05em',
            lineHeight: '0.86666',
          },
        ],
        heading5: [
          'calc(21px + 6 * ((100vw - 320px) / 1280))',
          {
            letterSpacing: '-0.05em',
            lineHeight: '0.86666',
          },
        ],
        heading6: [
          'calc(21px + 3 * ((100vw - 320px) / 1280))',
          {
            letterSpacing: '-0.05em',
            lineHeight: '0.86666',
          },
        ],
        list: [
          'calc(12px + 4 * ((100vw - 320px) / 1280))',
          {
            lineHeight: '1.5',
          },
        ],
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
    },
  },
}
