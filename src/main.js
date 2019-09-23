// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './config/http.js'
import common from './assets/js/common.js'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(common)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
