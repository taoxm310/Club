const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[A-Za-z0-9]{8,32}$')
      )
    }

    const { error } = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'a valid email address is a must'
          })
          break
        case 'password':
          res.status(400).send({
            error: `password failed, at least 8 charactor with lower case, upper case, number`
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid information'
          }
          )
      }
    }
    next()
  }
}
