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
    "public/brands": require("./modules/public/brands").default,
    "public/categories": require("./modules/public/categories").default,
    "public/entries": require("./modules/public/entries").default,
    "public/products": require("./modules/public/products").default,
    "public/notices": require("./modules/public/notices").default,
    "public/ads": require("./modules/public/ads").default,
    "public/schools": require("./modules/public/schools").default,

    categories: require("./modules/admin/categories").default,
    wxUsers: require("./modules/admin/wx-users").default,
    managers: require("./modules/admin/managers").default,
    ads: require("./modules/admin/ads").default,
    products: require("./modules/admin/products").default,
    orders: require("./modules/admin/orders").default,
    articles: require("./modules/admin/articles").default,
    comments: require("./modules/admin/comments").default,
    merchants: require("./modules/admin/merchants").default,
    coupons: require("./modules/admin/coupons").default,
    entries: require("./modules/admin/entries").default,
    schools: require("./modules/admin/schools").default,
    brands: require("./modules/admin/brands").default,
    notices: require("./modules/admin/notices").default,
    withdraws: require("./modules/admin/withdraws").default,
    commissions: require("./modules/admin/commissions").default,
    points: require("./modules/admin/points").default,
    shortcuts: require("./modules/admin/shortcuts").default,
    distributorApplications: require("./modules/admin/distributor-applications")
      .default,
    videos: require("./modules/admin/videos").default,
    outerProducts: require("./modules/admin/outer-products").default,
    schoolWxUsers: require("./modules/admin/school-wx-users").default,
    settings: require("./modules/admin/settings").default,
    incomes: require("./modules/admin/incomes").default
  }
});
