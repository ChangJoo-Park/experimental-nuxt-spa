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
  // const $match = {
  //   listId: ObjectId(uuid),
  //   done: false
  // }
  // .match(findOption)

  return mongo(db => db.collection('lists')
    .aggregate()
    .match(findOption)
    .lookup({
      from: 'items',
      localField: '_id',
      foreignField: 'listId',
      as: 'items'
    })
    .toArray()
    .catch(error => console.log(error)))
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

const findOne = (uuid, payload) => {
  return mongo(db => {
    const $match = {
      listId: ObjectId(uuid),
      done: false
    }

    if (payload.state === 'completed') {
      $match.done = true
    } else if (payload.state === 'all') {
      delete $match.done
    }
    return db.collection('lists').aggregate()
      .match({ _id: ObjectId(uuid) })
      .lookup({
        from: 'items',
        pipeline: [
          { $match }
        ],
        as: 'items'
      })
      .next()
    })
    .then(result => {
      return result
    })
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
  findOne,
  create,
  updateOne,
  patchOne,
  destroy,
  destroyOne
}
