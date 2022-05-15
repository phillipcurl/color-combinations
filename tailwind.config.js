module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or false or 'media'
  theme: {
    nightwind: {
      typography: {
        pre: {
          backgroundColor: 'gray.900',
          color: 'gray.300',
        },
      },
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            em: {
              fontStyle: 'italic',
              fontWeight: '500',
            },
          },
        },
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      fontFamily: {
        body: [
          'iA Quattro',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
    },
  },
  plugins: [
    require('nightwind'),
    require('tailwindcss-radix')(),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
