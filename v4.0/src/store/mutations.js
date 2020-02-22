import types from './types'

export default {
  [types.RESET_STATE] (state, payload) {
    Object.keys(state).forEach(module => {
      if (state[module].getInitState) {
        const initState = state[module].getInitState()

        Object.keys(initState).forEach(key => {
          state[module][key] = initState[key]
        })
      }
    })
  }
}
