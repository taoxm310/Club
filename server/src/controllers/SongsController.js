const { Song } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = {
  async index (req, res) {
    try {
      let songs = null
      const search = req.query.search
      if (search) {
        songs = await Song.findAll({
          where: {
            [Op.or]: [
              'title', 'artist', 'genre', 'album'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
      } else {
        songs = await Song.findAll({
          limit: 10
        })
      }
      res.send(songs)
    } catch (err) {
      res.status(500).send({
        error: 'error all'
      })
    }
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'error create'
      })
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findById(req.params.songId)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'error one'
      })
    }
  },
  async put (req, res) {
    try {
      await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'error updating'
      })
    }
  }
}
