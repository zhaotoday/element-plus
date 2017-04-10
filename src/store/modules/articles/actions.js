import types from './types'
import Model from '../../../models/articles'

export default {
  /**
   * 获取列表
   */
  getArticles ({commit}, {params}) {
    return new Model().GET({params}).then((res) => {
      commit(types.GET_ARTICLES, {
        data: res.data
      })
    })
  },

  /**
   * 新增
   */
  postArticle ({commit}, {data}) {
    return new Model().POST({data})
  }
}
