// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify'
import firebase from 'firebase';
import store from './store';
import Notifications from 'vue-notification'
import firebaseConfig from './firebase/firebaseConfig';

firebase.initializeApp(firebaseConfig);
Vue.use(Notifications)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, vuetify,store,
  components: { App },
  template: '<App/>'
})
