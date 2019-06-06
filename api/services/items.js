import { ObjectID } from 'mongodb'
import { mongo } from '../database'

const PRIORITY = {
  HIGH: 0,
  MEDIUM: 10,
  LOW: 20
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
  doneAt: null,
  listId: null,
  priority: PRIORITY.MEDIUM
}

const findAll = (user, query) => {
  const { done = '', list = null } = query
  const findOption = { userId: user._id }
  if (done === 'true' || done === 'false') {
    findOption.done = done === 'true'
  }

  if (list !== null) {
    findOption.listId = list
  } else {
    findOption.listId = null
  }

  return mongo(db =>
    db
      .collection('items')
      .find(findOption)
      .sort({ _id: -1 })
      .toArray()
  )
}

const findOneByUUID = uuid => {
  return mongo(db => db.collection('items').findOne({ _id: ObjectID(uuid) }))
}

const create = (user, { title, list }) => {
  console.log('create => list ', list)
  const newItem = NEW_ITEM
  newItem._id = new ObjectID()
  newItem.userId = ObjectID(user._id)
  newItem.listId = list
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
  const updatePayload = payload
  if (updatePayload) {
    if (updatePayload.done && updatePayload.done === true) {
      updatePayload.doneAt = new Date()
    } else if (updatePayload.done === false) {
      updatePayload.doneAt = null
    }
  }
  return mongo(db =>
    db.collection('items').findOneAndUpdate(
      { _id: ObjectID(uuid) },
      {
        $set: updatePayload
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
