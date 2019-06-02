import jwt from 'jsonwebtoken'
import config from '../../server.config'
import services from '../services'

const authenticated = async (req, res, next) => {
  try {
    const verified = jwt.verify(req.header('Authorization'), config.secret)
    return services.users.findOneByUUID(verified._id)
      .then(result => {
        if (!result) {
          const UserNotFoundError = new Error('User Not Found')
          UserNotFoundError.status = 404
          res.status(404).json(UserNotFoundError)
        }
        res.locals.user = result
        next()
      })
  } catch (error) {
    console.error(error)
    return res.status(error.status).json({ error })
  }
}
export default {
  authenticated
}
