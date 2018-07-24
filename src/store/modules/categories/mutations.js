import types from './types'

export default {
  [types.GET_CATEGORIES] (state, payload) {
    state.categories = payload.data
  },
  [types.GET_CATEGORY] (state, payload) {
    state.category = payload.data
  }
}
