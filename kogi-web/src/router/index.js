import Vue from 'vue'
import Router from 'vue-router'
import NavarBar from '@/components/NavarBar/index'

import Home from '@/components/Pages/Home/index'


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
          component: Home
        },
       
      ]
    }]
  ,  mode:'history'
  })
