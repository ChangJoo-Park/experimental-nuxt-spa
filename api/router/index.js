import express from 'express'

console.log('create router')

export const createRouter = () => {
  const router = express.Router()
  router.use(express.json())

  router.get('/api/status', function (req, res) {
    res.status(200).json('hello world')
  })
  return router
}
