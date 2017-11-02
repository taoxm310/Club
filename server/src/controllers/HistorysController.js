const { History, Song } = require('../models')
const _ = require('lodash')
// const Op = Sequelize.Op
module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const historys = await History.findAll({
        where: {
          UserId: userId
        },
        include: [Song]
      })
        .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Song,
          history))
      res.send(_.uniqBy(historys, history => history.SongId))
    } catch (err) {
      res.status(500).send({
        error: 'error all'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const { songId } = req.body
      console.log(req)
      const history = await History.create({
        SongId: songId,
        UserId: userId
      })
      res.send(history)
    } catch (err) {
      res.status(500).send({
        error: 'error post'
      })
    }
  }
}
