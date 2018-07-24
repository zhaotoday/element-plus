import types from './types'
import Model from '../../../models/settings'

export default {
  /**
   * 获取详情
   */
  getSetting ({ commit }, { id }) {
    return new Model().GET({ id }).then((res) => {
      commit(types.GET_SETTING, {
        data: res.data
      })
    })
  },

  /**
   * 编辑
   */
  putSetting ({ commit }, { id, body }) {
    return new Model().PUT({ id, body })
  }
}
