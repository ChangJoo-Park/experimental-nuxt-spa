import express from 'express'
import services from '../services'
import middlewares from '../middlewares'
const router = express.Router()
const { users } = services
const { auth } = middlewares

router.route('/signup').post(function(req, res) {
  return users
    .signup(req.body)
    .then(result => res.status(201).json(result))
    .catch(err => {
      return res.status(500).json({
        message: err.message
      })
    })
})

router.route('/signin').post(function(req, res) {
  return users
    .signin(req.body)
    .then(result => res.status(201).json(result))
    .catch(err => {
      return res.status(err.status).json({
        message: err.message
      })
    })
})

router.route('/me').get([auth.authenticated], function(req, res) {
  return res.json(res.locals.user)
})

export default router
