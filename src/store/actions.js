import types from './types'

export default {
  /**
   * 切换语言
   */
  patchLanguage ({commit}, {data}) {
    commit(types.PATCH_LANGUAGE, {
      language: data.language
    })
  }
}
