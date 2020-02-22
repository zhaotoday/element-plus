import types from './types'

export default {
  [types.GET_LIST] (state, payload) {
    state.list = payload.data
  },
  [types.GET_DETAIL] (state, payload) {
    state.detail = payload.data
  }
}
