import axios from 'axios'
import store from '@/store/store'

export default () => {
  return axios.create({
    baseURL: 'http://104.224.148.121:8081/',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
