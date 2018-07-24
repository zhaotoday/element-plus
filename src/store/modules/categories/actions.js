import types from './types'
import Model from '../../../models/articles'

export default {
  /**
   * 获取列表
   */
  getCategories ({commit}, {query}) {
    return new Model().GET({query}).then((res) => {
      commit(types.GET_CATEGORIES, {
        data: res.data
      })
    })
  },

  /**
   * 获取详情
   */
  getCategory ({commit}, {id}) {
    return new Model().GET({id}).then((res) => {
      commit(types.GET_CATEGORY, {
        data: res.data
      })
    })
  },

  /**
   * 新增
   */
  postCategory ({commit}, {body}) {
    return new Model().POST({body})
  },

  /**
   * 编辑
   */
  putCategory ({commit}, {id, body}) {
    return new Model().PUT({id, body})
  },

  /**
   * 删除
   */
  deleteCategory ({commit}, {id}) {
    return new Model().DELETE({id})
  }
}
