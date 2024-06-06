/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './src/**/**/*.js'],
  theme: {
    extend: {
      screens: {
        670: '670px',
        830: '830px',
        890: '890px',
      },
    },

  },
  plugins: [],
};
