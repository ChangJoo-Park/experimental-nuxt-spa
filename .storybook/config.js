import { configure } from '@storybook/vue'
import 'tailwindcss/dist/tailwind.min.css'
import '../assets/css/tailwind.css'

const req = require.context('../components', true, /\.story\.js$/)
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}
configure(loadStories, module);
