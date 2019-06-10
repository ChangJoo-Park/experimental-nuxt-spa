import { ObjectID, ObjectId } from 'mongodb'
import { mongo } from '../database'

const NEW_LIST = {
  _id: null,
  userId: null,
  title: '',
  members: [],
  removed: false,
  removedAt: null
}

const findAll = (user, query) => {
  const findOption = { userId: user._id, removed: false }

  return mongo(db =>
    db
      .collection('lists')
      .find(findOption)
      .sort({ _id: -1 })
      .toArray()
  )
}

const create = (user, { title }) => {
  const newItem = NEW_LIST
  newItem._id = new ObjectID()
  newItem.userId = ObjectID(user._id)
  newItem.title = title
  return mongo(db => db.collection('lists').insertOne(newItem))
    .then(({ ok, ops }) => ops[0])
    .catch(error => {
      console.error(error)
    })
}

const updateOne = payload => {
  return mongo(db => db.collection('lists').updateOne(payload))
}

const patchOne = (uuid, payload) => {
  const updatePayload = payload

  return mongo(db =>
    db.collection('lists').findOneAndUpdate(
      { _id: ObjectID(uuid) },
      {
        $set: updatePayload
      }
    )
  )
}

const destroy = () => {
  return mongo(db => db.collection('lists').remove({}))
}

const destroyOne = async uuid => {
  await mongo(db => db.collection('items').update({
    listId: ObjectId(uuid)
  }, {
    $set: { listId: null }
  }))

  return mongo(db => db.collection('lists').findOneAndUpdate({
    _id: ObjectId(uuid)
  }, {
    $set: { removed: true, removedAt: new Date() }
  }))
}

export default {
  findAll,
  create,
  updateOne,
  patchOne,
  destroy,
  destroyOne
}
