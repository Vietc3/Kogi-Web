import Vue from 'vue'
import Router from 'vue-router'
import NavarBar from '@/components/NavarBar/index'

import Home from '@/components/Pages/Home/index'
import Ranking from '@/components/Pages/Ranking/index'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: NavarBar,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
          meta: { title: 'Home', noCache: true}
        },
        {
          path: '/rankings',
          name: 'Ranking',
          component: Ranking,
          meta: { title: 'Ranking',noCache: true}
        },
       
      ]
    }]
  ,  mode:'history'
  })
