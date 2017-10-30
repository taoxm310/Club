import Api from '@/services/Api'

export default {
  index (credentials) {
    return Api().get('songs')
  },
  create (song) {
    return Api().post('songs', song)
  },
  show (songId) {
    return Api().get(`songs/${songId}`)
  }
}
