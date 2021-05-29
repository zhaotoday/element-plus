import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import storage from "jt-storage";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import publicModules from "./modules/public/index";
import adminModules from "./modules/admin/index";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["public/dicts"],
      storage: {
        getItem: key => storage.get(key),
        setItem: (key, value) => storage.set(key, value),
        removeItem: key => storage.remove(key)
      }
    })
  ],
  state: {},
  getters,
  actions,
  mutations,
  modules: {
    ...publicModules,
    ...adminModules
  }
});
