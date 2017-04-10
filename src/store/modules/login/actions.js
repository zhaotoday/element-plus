import Model from '../../../models/actions'

export default {
  /**
   * 登录
   */
  postActionsLogin ({commit}, {data}) {
    return new Model().POST({data})
  }
}
