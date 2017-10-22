import auth from '../auth'

/**
 * REST 辅助函数集合
 * @type {Object}
 */
export default {
  /**
   * 获取 Headers
   * @return {Object}
   */
  getHeaders () {
    const {manager, token} = auth.get()

    return {
      auth: window.btoa(`${manager.username}\n${token}`)
    }
  }
}
