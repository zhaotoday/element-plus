/**
 * 模拟接口
 */
export default class {
  /**
   * 登录
   * @param {Object} options 参数
   * @return {Promise}
   */
  POST (options) {
    return new Promise((resolve) => {
      const {username, password} = options.data

      resolve({
        token: username + ':' + password
      })
    })
  }
}
