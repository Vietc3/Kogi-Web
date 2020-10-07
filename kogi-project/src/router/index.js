import Vue from 'vue'
import Router from 'vue-router'
import NavarBar from '@/components/NavarBar/index'

import Home from '@/components/Pages/Home/index'
import Ranking from '@/components/Pages/Ranking/index'
import AppAsset from '@/components/Pages/App/index'
import Categories from '@/components/Pages/Categories/index'
import Discovery from '@/components/Pages/Discovery/index'
import SignIn from '@/components/Pages/Users/signIn'


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
          meta: { title: 'Home', icon: "fas fa-home", noCache: true }
        },
        {
          path: '/rankings',
          name: 'Ranking',
         
          component: Ranking,
          meta: { title: 'Ranking', icon: "mdi-trophy", noCache: true }
        },
        {
          path: '/discover',
          name: 'Discovery',
         
          component: Discovery,
          meta: { title: 'Discovery', icon: "mdi-compass-outline", noCache: true }
        },

      ]
    },

    {
      path: '/app',
      component: NavarBar,
      name:'AssetApp',
      redirect: '/',
      children: [
        {
        path: 'info/:id',
        name: 'Info',
        component: AppAsset,
        meta: { title: 'Info', noCache: true }
      }]
    },

    {
      path: '/categories',
      component: NavarBar,
      name:'CategoriesApp',
      redirect: '/',
      children: [
        {
        path: ':query',
        name: 'Categories',
        component: Categories,
        meta: { title: 'Categories', noCache: true }
      }]
    },

    {
      path: '/auth',
      component: NavarBar,
      name:'Auth',
      redirect: '/',
      children: [
        {
        path: 'login',
        name: 'Login',
        component: SignIn,
        meta: { title: 'SignIn', noCache: true }
      }]
    }


  ]

  , mode: 'history'
})
