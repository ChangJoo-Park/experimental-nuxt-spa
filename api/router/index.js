import express from 'express'
import cookieParser from 'cookie-parser'
import items from './items'
import auth from './auth'
import users from './users'
import lists from './lists'
import feeds from './feeds'

export const createRouter = () => {
  const router = express.Router()
  router.use(express.json())
  router.use(cookieParser())

  router.use('/api/items', items)
  router.use('/api/auth', auth)
  router.use('/api/users', users)
  router.use('/api/lists', lists)
  router.use('/api/feeds', feeds)

  router.get('/api/status', function(req, res) {
    res.status(200).json('hello world')
  })
  return router
}
