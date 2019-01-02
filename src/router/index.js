import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import QiitaApiSearch from '@/components/QiitaApiSearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/qiitaapisearch',
      name: 'QiitaApiSearch',
      component: QiitaApiSearch
    }
  ]
})
