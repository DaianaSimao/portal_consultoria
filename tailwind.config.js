const { plugin } = require("postcss");

module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
    "./src/**/*.{html,js}",
    './node_modules/tw-elements/js/**/*.js'
  ],
  plugins: [ // Correção aqui: altere 'plugin' para 'plugins'
    require("tw-elements/plugin.cjs"),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'custom-purple': '#6d5b98',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
};

