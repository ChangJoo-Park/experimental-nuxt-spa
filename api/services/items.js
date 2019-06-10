import { ObjectID, ObjectId } from 'mongodb'
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
  note: '',
  list: [],
  assigned: null,
  dueAt: null,
  done: false,
  doneAt: null,
  listId: null,
  priority: PRIORITY.MEDIUM
}

const findAll = (user, query) => {
  const { done = '', list = null } = query
  const findOption = { userId: ObjectId(user._id) }
  if (done === 'true' || done === 'false') {
    findOption.done = done === 'true'
  }

  if (list !== null) {
    findOption.listId = ObjectId(list)
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
  const newItem = NEW_ITEM
  newItem._id = new ObjectID()
  newItem.userId = ObjectId(user._id)
  newItem.listId = list ? ObjectId(list) : null
  newItem.title = title
  return mongo(db => db.collection('items').insertOne(newItem))
    .then(({ ok, ops }) => ops[0])
    .catch(error => {
      console.error(error)
    })
}

const updateOne = (uuid, payload) => {
  const updatePayload = payload
  updatePayload.userId = ObjectId(updatePayload.userId)
  updatePayload.listId = updatePayload.listId ? ObjectId(updatePayload.listId) : updatePayload.listId
  return mongo(db => db.collection('items')
    .updateOne({ _id: ObjectId(uuid) }, {
      $set: updatePayload
    }))
    .then(result => result)
    .catch(error => {
      console.error(error)
    })
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
      { _id: ObjectId(uuid) },
      {
        $set: updatePayload
      }
    )
  )
}

const destroy = (uuid) => {
  return mongo(db => db.collection('items').findOneAndUpdate({
    _id: ObjectId(uuid)
  }, {
    $set: { removed: true, removedAt: new Date() }
  }))
}

const destroyOne = uuid => {
  return mongo(db => db.collection('items').findOneAndUpdate({
    _id: ObjectId(uuid)
  }, {
    $set: { removed: true, removedAt: new Date() }
  }))
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
