import Vue from 'vue'
import Router from 'vue-router'
import NavarBar from '@/components/NavarBar/index'

import Home from '@/components/Pages/Home/index'
import Ranking from '@/components/Pages/Ranking/index'
import AppAsset from '@/components/Pages/App/index'
import Categories from '@/components/Pages/Categories/index'
import Discovery from '@/components/Pages/Discovery/index'
import SignIn from '@/components/Pages/Users/signIn'
import Profile from '@/components/Pages/Users/Profile/profile'
import Errors from '@/components/Errors/ErrorPage'


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
      name: 'AssetApp',
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
      name: 'CategoriesApp',
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
      name: 'Auth',
      redirect: '/',
      children: [
        {
          path: 'login',
          name: 'Login',
          component: SignIn,
          meta: { title: 'SignIn', noCache: true }
        }]
    },

    {
      path: '/profile',
      component: NavarBar,
      name: 'Profile',
      redirect: '/',
      children: [
        {
          path: '/',
          name: 'InfoAccount',
          component: Profile,
          meta: { title: 'Info', noCache: true }
        }]
    }, 
    {
      path: '/error',
      component: NavarBar,
      redirect: 'noredirect',
      name: 'ErrorPages',
      meta: {
        title: 'Errors',
        icon: 'mdi-information',
      },
      children: [
        {
          path: '301',
          component: Errors,
          name: 'Page301',
          meta: { title: '301', noCache: true },
          props: { errorCode: 301 },
        },
        {
          path: '401',
          component: Errors,
          name: 'Page401',
          meta: { title: '401', noCache: true },
          props: { errorCode: 401 },
        },
        {
          path: '403',
          component: Errors,
          name: 'Page403',
          meta: { title: '403' },
          props: { errorCode: 403 },
        },
        {
          path: '404',
          component: Errors,
          name: 'Page404',
          meta: { title: '404' },
          props: { errorCode: 404 },
        },
        {
          path: '500',
          component: Errors,
          name: 'Page500',
          meta: { title: '500' },
          props: { errorCode: 500 },
        },
      ],
    },
    { path: '*', redirect: '/error/404', hidden: true },
  ]

  , mode: 'history'
})
