// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import Panel from '@/components/globals/Panel'

Vue.config.productionTip = false

sync(store, router)

Vue.component('Panel', Panel)

Vue.use(Vuetify)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
