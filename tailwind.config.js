
const tailwindColors = require('tailwindcss/colors');

module.exports = {
  important: 'body#body',
  prefix: 'tw-',
  purge: ['./src/**/*.{html,vue,js,ts,jsx,tsx}', './public/**/*.{html,vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: tailwindColors,
  },
  plugins: [
    //require('tailwindcss-bootstrap-replacement'),
  ],
};
