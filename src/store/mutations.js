import types from './types'

export default {
  [types.PATCH_LANGUAGE] (state, payload) {
    state.language = payload.language
  }
}
