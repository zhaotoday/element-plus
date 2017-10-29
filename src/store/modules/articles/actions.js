import types from './types'
import Model from '../../../models/articles'

export default {
  /**
   * 获取列表
   */
  getArticles ({commit}, {query}) {
    return new Model().GET({query}).then((res) => {
      commit(types.GET_ARTICLES, {
        data: res.data
      })
    })
  },

  /**
   * 获取详情
   */
  getArticle ({commit}, {id}) {
    return new Model().GET({id}).then((res) => {
      commit(types.GET_ARTICLE, {
        data: res.data
      })
    })
  },

  /**
   * 新增
   */
  postArticle ({commit}, {body}) {
    return new Model().POST({body})
  },

  /**
   * 编辑
   */
  putArticle ({commit}, {id, body}) {
    return new Model().PUT({id, body})
  },

  /**
   * 删除
   */
  deleteArticle ({commit}, {id}) {
    return new Model().DELETE({id})
  }
}
