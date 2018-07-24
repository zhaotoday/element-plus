import types from './types'

export default {
  [types.GET_SETTING] (state, payload) {
    state.setting = payload.data
  }
}
