const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      const token = jwtSignUser(userJson)
      res.send({
        user: userJson,
        token
      })
    } catch (err) {
      res.status(400).send({
        error: 'already in use'
      })
    }
    res.send({
      message: `hello ${req.body.email}, registered`
    })
  },

  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (!user) {
        res.status(403).send({
          error: 'login information is incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        res.status(400).send({
          error: 'login information is incorrect'
        })
      }

      const userJson = user.toJSON()
      const token = jwtSignUser(userJson)
      res.send({
        user: userJson,
        token
      })
    } catch (err) {
      res.status(400).send({
        error: 'error occured'
      })
    }
  }
}
