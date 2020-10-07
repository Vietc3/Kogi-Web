import config from '@/config';
import user from '@/store/modules/user';

/**
 * Vuex plugin for save and sync 'settings' and 'user' from vuex modules.
 */
class SyncStorage {
  constructor(option) {
    /** init options */
    this.storage = (window && window[option.storage]) || (window && window[config.storage]);
    this.prefix = option.prefix || config.prefix;
    this.ttl = option.ttl || config.ttl;
    this.user = 'user';
    this.userMutations = this.getModuleOptions(user, 'mutations');
    console.log('[vuex.SyncStorage] option:',
      option.storage || config.storage, this.prefix, this.ttl, option);
  }

  /**
   * Vuex subscribe plugin function.
   * @param {Object} store Vuex instance
   */

  subscribe = async (store) => {
   
    if (!this.checkStorage()) {
      throw new Error('[vuex.SyncStorage] Invalid "Storage" instance given');
    }

    if (this.checkVersion(config.version)) {
      console.log(`[vuex.SyncStorage] Current version of the application "${config.version}"`);
    } else {
      console.warn(`[vuex.SyncStorage] Application version updated to "${config.version}"`);
    }

    // init and apply user state from storage
    if (this.initUserState(store)) {
      console.log('[vuex.SyncStorage] initUserState');
    } else {
      console.warn('[vuex.SyncStorage] No user state in "Storage"');
    }

    // init and apply settings state from storage
    store.subscribe((mutation, state) => {
      // console.log('storage subscribe', mutation.type);
      if (this.userMutations.includes(mutation.type)) {
        // console.log('storage subscribe user_mutations', mutation, state);
        this.setToStorage(`${this.prefix}${this.user}`, JSON.stringify(state.user));
        if (mutation.type === 'SET_TOKEN') {
          this.setToStorage(`${this.prefix}ttl`, this.getSeconds(this.ttl));
        }
      }
    });

  };

  /**
   * Get current seconds + ttl.
   * @param {Number} ttl Session lifetime
   */
  getSeconds = (ttl) => Math.floor(Date.now() / 1000) + (ttl || 0);

  /**
   * Get array of module mutation types.
   */
  getModuleOptions = (module, key) => {
    if (!module || !module[key]) return [];
    return Object.keys(module[key]);
  };

  /**
   * Check LocalStorage to read/write.
   */
  checkStorage() {
    try {
      this.storage.setItem(`${this.prefix}@@`, 1);
      this.storage.removeItem(`${this.prefix}@@`);
    } catch (err) {
      console.error(`[vuex.SyncStorage] Check storage failed: ${err}`);
      return false;
    }
    return true;
  }

  /**
   * Check application version.
   * If the version of the application has changed, then the storage is cleared of the session
   * and settings. Required to apply the settings of the new version of the application
   * @param {String} version version of the application
   */
  checkVersion(version) {
    try {
      if (this.getFromStorage(`${this.prefix}version`) === version) {
        return true;
      }

      this.storage.clear();
      this.setToStorage(`${this.prefix}version`, version);
    } catch (err) {
      console.error(`[vuex.SyncStorage] Check version failed: ${err}`);
    }
    return false;
  }

  /**
   * Get user info from storage.
   */
  initUserState(store) {
   
    const userState =JSON.parse( this.getFromStorage(`${this.prefix}${this.user}`));

    if (userState.displayName===''&&userState.photoURL===''&&userState.phoneNumber===''||!userState) {
     
      console.warn('[vuex.SyncStorage] Session expired');
      store.commit('SET_TOKEN', '')
      store.commit('SET_DISPLAY_NAME', '')
      store.commit('SET_PHOTO', '')
      store.commit('SET_PHONE_NUMBER', '')
      return false;
    }

    else { 
      console.warn('[vuex.SyncStorage] Session active');
      store.commit('SET_DISPLAY_NAME',userState.displayName)
      store.commit('SET_PHOTO',userState.photoUrl)
      store.commit('SET_PHONE_NUMBER', userState.phoneNumber)
      return true;
    }
  }

  /**
   * Get settings from storage.
   */
 
  /**
   * Get data to storage.
   * @param {String} key
   * @param {String} value
   */
  setToStorage(key, value) {
    try {
      this.storage.setItem(key, value);
    } catch (err) {
      console.error(`[vuex.SyncStorage] setItem storage failed: ${err}`);
      return false;
    }
    return true;
  }

  /**
   * Get data from storage.
   * @param {String} key
   */
  getFromStorage(key) {
    try {
      return this.storage.getItem(key);
    } catch (err) {
      console.error(`[vuex.SyncStorage] getItem storage failed: ${err}`);
    }
    return '';
  }
}

export default function (syncStorageOption) {
  const syncStorage = new SyncStorage(syncStorageOption);
  return syncStorage.subscribe;
}
