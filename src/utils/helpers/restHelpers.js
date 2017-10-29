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
    return {
      Authorization: auth.get()['token']
    }
  },

  /**
   * 转字符串
   * @returns {string}
   */
  whereToStr (obj) {
    let ret = {}

    Object.keys(obj).forEach(v => {
      ret[v] = {}

      if (typeof obj[v].$like !== 'undefined') {
        ret[v].$like = `%${obj[v].$like}%`
      } else {
        ret[v] = obj[v]
      }
    })

    return JSON.stringify(ret)
  }
}
