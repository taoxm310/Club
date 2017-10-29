const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[A-Za-z0-9]{8,32}$')
      )
    }
    next()
  }
}
