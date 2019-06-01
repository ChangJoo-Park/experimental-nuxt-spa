import express from 'express'
import services from '../services'
const router = express.Router()
const { items } = services

router.route('/')
  .get(function (req, res) {
    return res.status(200).json([])
   })
  .post(function (req, res) { })

router.route('/:itemId')
.get(function (req, res) {
  return res.status(200).json([])
 })
.put(function (req, res) { })
.patch(function (req, res) { })
.delete(function (req, res) { })

export default router
