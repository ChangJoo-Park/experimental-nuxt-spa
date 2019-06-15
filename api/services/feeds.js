import { ObjectID, ObjectId } from 'mongodb'
import { mongo } from '../database'

const NEW_FEED = {
  _id: null,
  userId: null,
  body: '',
  createdAt: null,
  updatedAt: null
}

const findAll = (user, query) => {
  return mongo(db =>
    db
      .collection('feeds')
      .aggregate()
      .lookup({
        from: 'users',
        localField: '_id',
        foreignField: 'userId',
        as: 'user'
      })
      .sort({ createdAt: -1 })
      .toArray()
  )
}

const create = (user, { body }) => {
  const newItem = NEW_FEED
  newItem._id = new ObjectID()
  newItem.userId = ObjectId(user._id)
  newItem.body = body
  newItem.createdAt = new Date()
  newItem.updatedAt = new Date()

  return mongo(db => db.collection('feeds').insertOne(newItem))
    .then(({ ok, ops }) => ops[0])
    .catch(error => {
      console.error(error)
    })
}


export default {
  findAll,
  create
}
