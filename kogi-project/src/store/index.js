import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import syncStorage from './plugins/syncStorage';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user
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
