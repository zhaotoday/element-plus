import types from './types'

export default {
  [types.GET_DETAIL] (state, payload) {
    state.detail = payload.data
  }
}
