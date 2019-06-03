import consola from 'consola'

const logger = consola.create({
  // level: 4,
  reporters: [new consola.FancyReporter()],
  defaults: {
    additionalColor: 'white'
  }
})

export default function(req, res, next) {
  if (req.path.includes('api')) {
    logger.info({ message: req.path, badge: true })
  }
  next()
}
