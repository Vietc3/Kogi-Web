import Vue from 'vue'
import Router from 'vue-router'
import NavarBar from '@/components/NavarBar/index'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: NavarBar,
    }]
  ,  mode:'history'
  })
