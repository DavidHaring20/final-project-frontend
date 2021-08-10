
const tailwindColors = require('tailwindcss/colors');

module.exports = {
<<<<<<< HEAD
  // important: 'body#body',
  // prefix: 'tw-',
=======
  important: 'body',
>>>>>>> 22f173cbaa61a90b3cb230a7e29075ba47204d02
  purge: ['./src/**/*.{html,vue,js,ts,jsx,tsx}', './public/**/*.{html,vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: tailwindColors,
  },
  plugins: [
    //require('tailwindcss-bootstrap-replacement'),
  ],
};
