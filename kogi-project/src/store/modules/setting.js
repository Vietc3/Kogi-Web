import { settings as defaultSettings, version } from '@/config';

import { setLocale } from '@/i18n';

const getDefaultSettings = () => {
  const settings = JSON.parse(JSON.stringify(defaultSettings));
  return settings;
};

const settings = {
  state: getDefaultSettings(), // Deep Clone
  getters: {
    locale: (state) => state.locale,
  },
  mutations: {

    SET_SETTINGS: (state, payload) => {
      state.locale = payload.locale || state.locale;    
      setLocale(state.locale);
    },
    SET_LOCALE: (state, payload) => {
      state.locale = payload.locale;
    },
  },
  actions: {
    SetLocale: async (context, payload) => {
      context.commit('SET_LOCALE', payload);
      await setLocale(payload.locale);
    },
  }

};

export default settings;
