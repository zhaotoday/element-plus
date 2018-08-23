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
    let types = []

    Object.keys(obj).forEach(v => {
      ret[v] = {}
      types = Object.keys(obj[v])

      types.forEach(type => {
        if (!obj[v][type] && obj[v][type] !== 0) {
          delete ret[v]
        } else if (type === '$like') {
          ret[v][type] = `%${obj[v][type]}%`
        } else {
          ret[v] = obj[v]
        }
      })
    })

    return JSON.stringify(ret)
  }
}
