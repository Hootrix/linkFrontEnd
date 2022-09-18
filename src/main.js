import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './config/http.js'
import common from './assets/js/common.js'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(common)

new Vue({
  render: h => h(App),
  router:router,
}).$mount('#app')
