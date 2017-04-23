import iView from 'iview'

/**
 * REST 辅助函数集合
 * @type {Object}
 */
export default {
  /**
   * 成功处理
   */
  successHandler () {},

  /**
   * 失败处理
   */
  errorHandler (res) {
    iView.Message.error(res.response.data.error.message)
  }
}
