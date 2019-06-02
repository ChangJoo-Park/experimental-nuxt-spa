import express from 'express'
import items from './items'
import auth from './auth'
import users from './users'

export const createRouter = () => {
  const router = express.Router()
  router.use(express.json())

  router.use('/api/items', items)
  router.use('/api/auth', auth)
  router.use('/api/users', users)

  router.get('/api/status', function (req, res) {
    res.status(200).json('hello world')
  })
  return router
}
