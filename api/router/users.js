import express from 'express'
import services from '../services'
const router = express.Router()
const { users } = services

router.route('/')
  .get(function (req, res) {
    return users.findAll()
      .then(result => res.status(200).json(result))
  })


export default router
