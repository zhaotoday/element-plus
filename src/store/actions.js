import types from './types'

/**
 * 切换语言
 * @param {function} commit
 * @param {Object} payload
 */
export const putLanguage = ({commit}, payload) => {
  commit(types.PUT_LANGUAGE, {
    language: payload.language
  })
}
