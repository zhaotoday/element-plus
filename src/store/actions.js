import types from './types'

export default {
  resetState ({ commit }, payload) {
    commit(types.RESET_STATE, payload)
  }
}
