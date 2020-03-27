import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import storage from "jt-storage";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

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
    "public/managers": require("./modules/public/managers").default,
    "public/dicts": require("./modules/public/dicts").default,
    categories: require("./modules/admin/categories").default,
    wxUsers: require("./modules/admin/wx-users").default,
    managers: require("./modules/admin/managers").default,
    ads: require("./modules/admin/ads").default,
    products: require("./modules/admin/products").default,
    orders: require("./modules/admin/orders").default
  }
});
