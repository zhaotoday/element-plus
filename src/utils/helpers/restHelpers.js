import iView from 'iview'
import auth from '../auth'
import { Base64 } from 'js-base64'

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
  },

  /**
   * 获取 Headers
   * @return {Object}
   */
  getHeaders () {
    const {manager, token} = auth.get()

    return {
      auth: Base64.encode(`${manager.username}\n${token}`)
    }
  }
}
