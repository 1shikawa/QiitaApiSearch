import Vue from 'vue'
import Router from 'vue-router'
import QiitaApiSearch from '@/components/QiitaApiSearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'QiitaApiSearch',
      // component: QiitaApiSearch,
      redirect: '/QiitaApiSearch'
    },
    {
      path: '/QiitaApiSearch',
      name: 'QiitaApiSearch',
      component: QiitaApiSearch
    }
  ]
})
