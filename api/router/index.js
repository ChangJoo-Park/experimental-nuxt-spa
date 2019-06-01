import express from 'express'
import items from './items'

export const createRouter = () => {
  const router = express.Router()
  router.use(express.json())

  router.use('/api/items', items)

  router.get('/api/status', function (req, res) {
    res.status(200).json('hello world')
  })
  return router
}
