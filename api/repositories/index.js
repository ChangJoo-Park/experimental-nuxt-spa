import items from './items'
import lists from './lists'
import auth from './auth'

export default $axios => ({
  items: items($axios),
  lists: lists($axios),
  auth: auth($axios)
})
