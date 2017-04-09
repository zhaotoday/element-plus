import types from './types'
import Model from '../../../models/articles'

export default {
  /**
   * 获取列表
   */
  getArticles ({commit}, payload) {
    return new Model().GET().then((res) => {
      commit(types.GET_ARTICLES, {
        data: res.data
      })
    })
  },

  /**
   * 新增
   */
  putArticle ({commit}, payload) {
    return new Model().PUT(payload).then((res) => {
      commit(types.GET_ARTICLES, {
        data: res.data
      })
    })
  }
}
