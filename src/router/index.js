import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', // 去除url中的 /#
  routes: [
    {
      path: '*',
      name: 'index',
      component: index
    }
  ]
})
