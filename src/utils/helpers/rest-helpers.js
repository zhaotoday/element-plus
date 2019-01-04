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
      ret[v] = null
      types = Object.keys(obj[v])

      if (types.length) {
        types.forEach(type => {
          if (obj[v][type] === undefined || obj[v][type] === '') {
            delete ret[v]
          } else if (type === '$like') {
            ret[v][type] = `%${obj[v][type]}%`
          } else {
            ret[v] = obj[v]
          }
        })
      } else {
        ret[v] = obj[v]
      }
    })

    return JSON.stringify(ret)
  }
}
