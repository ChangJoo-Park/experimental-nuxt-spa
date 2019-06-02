import express from 'express'
import services from '../services'
const router = express.Router()
const { users } = services

router.route('/signup')
  .post(function (req, res) {
    return users.signup(req.body)
      .then(result => res.status(201).json(result))
      .catch(err => {
        return res.status(500).json({
          message: err.message
        })
      })
  })

router.route('/signin')
  .post(function (req, res) {
    return users.signin(req.body)
      .then(result => res.status(201).json(result))
      .catch(err => {
        return res.status(500).json({
          message: err.message
        })
      })
  })

export default router
