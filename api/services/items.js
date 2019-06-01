import { ObjectID } from 'mongodb'
import { mongo } from '../database'

const findAll = () => {
  return mongo(db => db.collection('items').find({}).toArray())
}

const findOneByUUID = (uuid) => {
  return mongo(db => db.collection('items').findOne({ _id: ObjectID(uuid) }))
}

const create = (payload) => {
  return mongo(db => db.collection('items').insertOne(payload))
    .then(({ ok, ops }) => ops[0])
}

const updateOne = (payload) => {
  return mongo(db => db.collection('items').updateOne(payload))
}

const patchOne = (uuid, payload) => {
  return mongo(db => db.collection('items').findOneAndUpdate({ _id: ObjectID(uuid) }, {
    $set: payload
  }))
}

const destroy = () => {
  return mongo(db => db.collection('items').remove({}))
}

const destroyOne = (uuid) => {
  return mongo(db => db.collection('items').findOneAndDelete({ _id: ObjectID(uuid) }))
}

export default {
  findAll,
  findOneByUUID,
  create,
  updateOne,
  patchOne,
  destroy,
  destroyOne
}
