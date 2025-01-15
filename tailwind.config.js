/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          'text-shadow': '1px 1px 2px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-md': {
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-lg': {
          'text-shadow': '4px 4px 6px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-none': {
          'text-shadow': 'none',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
