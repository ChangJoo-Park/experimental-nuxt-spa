import { ObjectID } from 'mongodb'
import { mongo } from '../database'

const PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
}

const NEW_ITEM = {
  _id: null,
  userId: null,
  title: '',
  startDate: null,
  endDate: null,
  startTime: null,
  endTime: null,
  list: [],
  assigned: null,
  done: false,
  projectId: null,
  priority: PRIORITY.MEDIUM
}

const findAll = user => {
  return mongo(db =>
    db
      .collection('items')
      .find({ userId: user._id })
      .toArray()
  )
}

const findOneByUUID = uuid => {
  return mongo(db => db.collection('items').findOne({ _id: ObjectID(uuid) }))
}

const create = (user, { title }) => {
  const newItem = NEW_ITEM
  newItem._id = new ObjectID()
  newItem.userId = ObjectID(user._id)
  newItem.title = title
  console.log('newItem => ', newItem)
  return mongo(db => db.collection('items').insertOne(newItem))
    .then(({ ok, ops }) => ops[0])
    .catch(error => {
      console.error(error)
    })
}

const updateOne = payload => {
  return mongo(db => db.collection('items').updateOne(payload))
}

const patchOne = (uuid, payload) => {
  return mongo(db =>
    db.collection('items').findOneAndUpdate(
      { _id: ObjectID(uuid) },
      {
        $set: payload
      }
    )
  )
}

const destroy = () => {
  return mongo(db => db.collection('items').remove({}))
}

const destroyOne = uuid => {
  return mongo(db =>
    db.collection('items').findOneAndDelete({ _id: ObjectID(uuid) })
  )
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
