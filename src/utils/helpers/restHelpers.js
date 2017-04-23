import iView from 'iview'

/**
 * REST 辅助函数集合
 * @type {Object}
 */
export default {
  /**
   * 成功处理
   * @param {Object} res 返回数据
   */
  successHandler (res) {},

  /**
   * 失败处理
   * @param {Object} res 返回数据
   */
  errorHandler (res) {
    iView.Message.error(res.response.data.error.message)
  }
}
