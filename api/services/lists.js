import { ObjectID } from 'mongodb'
import { mongo } from '../database'

const NEW_LIST = {
  _id: null,
  userId: null,
  title: '',
  members: []
}

const findAll = (user, query) => {
  const findOption = { userId: user._id }

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

const destroyOne = uuid => {
  return mongo(db =>
    db.collection('lists').findOneAndDelete({ _id: ObjectID(uuid) })
  )
}

export default {
  findAll,
  create,
  updateOne,
  patchOne,
  destroy,
  destroyOne
}
