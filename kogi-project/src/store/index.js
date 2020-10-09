import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import settings from './modules/setting';
import syncStorage from './plugins/syncStorage';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        settings
    },
    plugins: [
        syncStorage({}),
      ],
    state: {
    },
    mutations: {
    },
    actions: {
    },

});
