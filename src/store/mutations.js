import types from './types'

export default {
  [types.PUT_LANGUAGE] (state, payload) {
    state.language = payload.language
  }
}
