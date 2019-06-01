import { MongoClient } from 'mongodb'
import config from '../../server.config'

const ensureConnect = () => {
  return MongoClient.connect(config.mongodb, {
    useNewUrlParser: true,
    poolSize: 10
  })
    .then(conn => client = conn)
    .then(conn => conn.db())
    .catch(e => {
      console.error(e)
      return Promise.reject(new ServerError('db connection error'))
    })
}

export const mongo = cb => ensureConnect().then(cb)
