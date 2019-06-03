import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { ObjectID } from 'mongodb'
import { mongo } from '../database'
import config from '../../server.config'

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

const signup = async payload => {
  const { email, password } = payload
  if (!email || !password) {
    const err = new Error('email or password not found')
    err.status = 404
    return Promise.reject(err)
  }

  const user = await mongo(db => db.collection('users').findOne({ email }))
  if (user) {
    return Promise.reject(new Error('already exists'))
  }

  const passwordHash = bcrypt.hashSync(password, salt)
  const newUser = { email, passwordHash, username: email }
  return mongo(db => db.collection('users').insertOne(newUser)).then(
    ({ ok, ops }) => ops[0]
  )
}

const signin = async payload => {
  const { email, password } = payload
  if (!email || !password) {
    const err = new Error('email or password not found')
    err.status = 404
    return Promise.reject(err)
  }
  const user = await mongo(db => db.collection('users').findOne({ email }))
  if (!user) {
    return Promise.reject(new Error('user not found'))
  }

  const samePassword = bcrypt.compareSync(password, user.passwordHash)
  if (!samePassword) {
    return Promise.reject(new Error('password not matched'))
  }

  const access_token = jwt.sign(
    { _id: user._id, email: user.email },
    config.secret
  )
  return Promise.resolve({ access_token, user })
}

const findAll = () => {
  return mongo(db =>
    db
      .collection('users')
      .find({})
      .toArray()
  )
}

const findOneByUUID = uuid => {
  return mongo(db => db.collection('users').findOne({ _id: ObjectID(uuid) }))
}

export default {
  signup,
  signin,
  findAll,
  findOneByUUID
}
