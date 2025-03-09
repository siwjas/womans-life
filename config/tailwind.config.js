const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{html,js,erb}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      darkMode: 'class',
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [

  ]
}
