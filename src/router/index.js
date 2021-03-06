import Vue from 'vue'
import Router from 'vue-router'
import QiitaApiSearch from '@/components/QiitaApiSearch.vue'
import QiitaApiSearchUser from '@/components/QiitaApiSearchUser.vue'

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
    },
    {
      path: '/QiitaApiSearchUser',
      name: 'QiitaApiSearchUser',
      component: QiitaApiSearchUser
    }
  ]
})
