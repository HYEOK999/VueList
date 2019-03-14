import Vue from 'vue'
import App from './App.vue'
import { router } from './routes/index.js'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import store from './store/index.js'
//import express from 'express'
// import cfg from '../cfg/cfg'
import infiniteScroll from 'vue-infinite-scroll'

Vue.prototype.$http = axios;
Vue.prototype.$EventBus = new Vue();
Vue.use(BootstrapVue); //bootstrap 추가사용.
Vue.use(infiniteScroll)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
