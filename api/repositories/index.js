import items from './items'
import auth from './auth'

export default $axios => ({
  items: items($axios),
  auth: auth($axios)
})
