import express from 'express'
import services from '../services'
const router = express.Router()
const { items } = services

router.route('/')
  .get(function (req, res) {
    return items.findAll().then(result => res.status(200).json(result))
  })
  .post(function (req, res) {
    return items.create(req.body).then(result => res.status(201).json(result))
  })

router.route('/:itemId')
  .get(function (req, res) {
    return items.findOneByUUID(req.params.itemId)
      .then(result => res.status(200).json(result))
  })
  .put(function (req, res) { })
  .patch(function (req, res) {
    return items.patchOne(req.params.itemId, req.body)
      .then(result => res.status(200).json(result))
  })
  .delete(function (req, res) {
    return items.destroyOne(req.params.itemId)
      .then(result => res.status(200).json(result))
  })

export default router
