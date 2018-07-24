import types from './types'

export default {
  [types.GET_CATEGORIES] (state, payload) {
    state.articles = payload.data
  },
  [types.GET_CATEGORY] (state, payload) {
    state.article = payload.data
  }
}
