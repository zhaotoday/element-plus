import * as bridge from './bridge'

/**
 * REST 接口请求
 */
export default class REST {
  /**
   * 构造函数
   */
  constructor() {
    // 是否需要鉴权
    this.authed = true
    // 接口基础地址
    this.baseURL = ''
    // 接口版本
    this.version = ''
    // 请求路劲
    this.path = ''
    // headers
    this.headers = {}
  }

  /**
   * 请求
   * @param {string} method - 请求方式
   * @param {object} options - 选项
   * @return {object}
   */
  _request(method = 'GET', options = {}) {
    let url = this.version ? `/${this.version}/${this.path}` : `/${this.path}`

    // GET
    if (options.params) url = url + this._objToUrl(options.params)

    return new Promise((resolve, reject) => {
      bridge.restDao[method.toLowerCase()]({
        rest: {
          authed: this.authed,
          method: method,
          baseURL: this.baseURL,
          url: url,
          data: options.data || {},
          headers: this.headers
        },
        uri: this.baseURL + url,
        data: options.data || {}
      }).then((args) => {
        resolve(args.data || {})
      }).catch((args) => {
        reject(args.data || {})
      })
    })
  }

  /**
   * 对象转 URL
   * @param {object} obj - 待转化对象
   * @return {string}
   */
  _objToUrl(obj) {
    if (!obj || !Object.keys(obj).length) {
      return ''
    }

    return '?' + Object.keys(obj).map((key) => {
        return `${key}=${encodeURIComponent(obj[key])}`
      }).join('&')
  }

  /**
   * 附加路劲
   * @param {string} path - 路劲
   */
  addPath(path = '') {
    this.path = this.path + '/' + path

    return this
  }

  /**
   * 添加 headers
   * @param {object} headers - headers
   */
  addHeaders(headers) {
    this.headers = {
      ...this.headers,
      ...headers
    }

    return this
  }

  /**
   * path 参数替换
   * @param {object} options - path 参数列表
   */
  replace(options = {}) {
    Object.keys(options).forEach((key) => {
      this.path = this.path.replace(new RegExp('{' + key + '}', 'img'), options[key])
    })

    return this
  }

  /**
   * GET
   * @param {object} options - 选项
   * @return {object}
   */
  GET(options = {}) {
    return this._request('GET', options)
  }

  /**
   * DELETE
   * @param {object} options - 选项
   * @return {object}
   */
  DELETE(options = {}) {
    return this._request('DELETE', options)
  }

  /**
   * POST
   * @param {object} options - 选项
   * @return {object}
   */
  POST(options = {}) {
    return this._request('POST', options)
  }

  /**
   * PATCH
   * @param {object} options - 选项
   * @return {object}
   */
  PATCH(options = {}) {
    return this._request('PATCH', options)
  }
}
