import express from 'express'
import services from '../services'
import middlewares from '../middlewares'
const router = express.Router()
const { lists } = services
const { auth } = middlewares

router
  .route('/')
  .get([auth.authenticated], function(req, res) {
    return lists
      .findAll(res.locals.user)
      .then(result => res.status(200).json(result))
      .catch(error => res.status(500).json(error))
  })
  .post([auth.authenticated], function(req, res) {
    return lists
      .create(res.locals.user, req.body)
      .then(result => res.status(201).json(result))
  })
router
  .route('/:listId')
  .get([auth.authenticated], function (req, res) {
    return lists
      .findOne(req.params.listId, req.query)
      .then(result => {
        if (!result) {
          return res.status(404).json({})
        }
        return res.status(200).json(result)
      })
  })
  .patch([auth.authenticated], function(req, res) {
    return lists
      .patchOne(req.params.listId, req.body)
      .then(result => res.status(200).json(result))
  })
  .delete([auth.authenticated], function(req, res) {
    return lists
      .destroyOne(req.params.listId)
      .then(result => res.status(200).json(result))
  })

export default router
