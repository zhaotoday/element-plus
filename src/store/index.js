import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import articles from './modules/articles'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: 'zh-CN'
  },
  mutations,
  actions,
  getters,
  modules: {
    articles
  }
})
