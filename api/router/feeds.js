import express from 'express'
import services from '../services'
import middlewares from '../middlewares'
const router = express.Router()
const { feeds } = services
const { auth } = middlewares

router
  .route('/')
  .get([auth.authenticated], function(req, res) {
    return feeds
      .findAll(res.locals.user, req.query)
      .then(result => res.status(200).json(result))
  })
  .post([auth.authenticated], function(req, res) {
    return feeds
      .create(res.locals.user, req.body)
      .then(result => res.status(201).json(result))
  })

export default router
