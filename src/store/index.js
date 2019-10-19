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
    ads: require('./modules/admin/ads').default,
    helpers: require('./modules/admin/helpers').default,
    categories: require('./modules/admin/categories').default,
    wxUsers: require('./modules/admin/wx-users').default,
    comments: require('./modules/admin/comments').default,
    coupons: require('./modules/admin/coupons').default,
    couponActivities: require('./modules/admin/coupon-activities').default,
    rbacRoles: require('./modules/admin/rbac-roles').default,
    rbacResources: require('./modules/admin/rbac-resources').default,
    settings: require('./modules/admin/settings').default,
    logs: require('./modules/admin/logs').default,
    resources: require('./modules/admin/resources').default,
    managers: require('./modules/admin/managers').default,
    surveySubjects: require('./modules/admin/survey-subjects').default,
    surveyQuestions: require('./modules/admin/survey-questions').default,
    surveyResults: require('./modules/admin/survey-results').default,
    activities: require('./modules/admin/actitivies').default,
    freights: require('./modules/admin/freights').default,
    suppliers: require('./modules/admin/suppliers').default
  }
})
