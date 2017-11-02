const { Bookmark, Song } = require('../models')
const _ = require('lodash')
// const Op = Sequelize.Op
module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const { songId } = req.query
      const where = {
        UserId: userId
      }

      if (songId) {
        where.SongId = songId
      }
      const bookmarks = await Bookmark.findAll({
        where,
        include: [Song]
      })
        .map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend(
          {},
          bookmark.Song,
          bookmark))
      res.send(bookmarks)
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
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'already have'
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      res.status(500).send({
        error: 'error all'
      })
    }
  },
  async delete (req, res) {
    try {
      const userId = req.user.id
      const { bookmarkId } = req.params
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'you do not have access to this bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'error destory'
      })
    }
  }
}
