import items from './items'
import lists from './lists'
import auth from './auth'
import feeds from './feeds'

export default $axios => ({
  items: items($axios),
  lists: lists($axios),
  auth: auth($axios),
  feeds: feeds($axios)
})
