import types from './types'

export default {
  [types.GET_ARTICLES] (state, payload) {
    state.articles = payload.data
  }
}
