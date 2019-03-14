import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters,
  actions,
  mutations,
  modules: {
    'public/managers': require('./modules/public/managers').default,
    articles: require('./modules/admin/articles').default,
    products: require('./modules/admin/products').default,
    orders: require('./modules/admin/orders').default,
    categories: require('./modules/admin/categories').default,
    wxUsers: require('./modules/admin/wx-users').default,
    rbacRoles: require('./modules/admin/rbac-roles').default,
    rbacResources: require('./modules/admin/rbac-resources').default,
    settings: require('./modules/admin/settings').default
  }
})
