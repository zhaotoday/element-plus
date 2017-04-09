import types from './types'

export default {
  /**
   * 切换语言
   */
  patchLanguage ({commit}, payload) {
    commit(types.PATCH_LANGUAGE, {
      language: payload.language
    })
  }
}
