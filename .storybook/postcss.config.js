const join = require('path').join
const tailwindJS = join(__dirname, '..', 'tailwind.js')
console.log('tailwindJS => ', tailwindJS)
module.exports = {
  plugins: [
    require('tailwindcss')(tailwindJS),
    require('autoprefixer')
  ]
}
