import axios from 'axios'

/**
 * 基于 axios 的 RESTful HTTP 简单封装
 * @author 赵金添 <729234283@qq.com>
 */
export default class REST {
  /**
   * 构造方法
   */
  constructor () {
    /**
     * 接口基础地址
     * @type {string}
     */
    this.baseURL = ''

    /**
     * 接口版本
     * @type {string}
     */
    this.version = ''

    /**
     * 请求路劲
     * @type {string}
     */
    this.path = ''

    /**
     * Headers
     * @type {Object}
     */
    this.headers = {}

    // 支持的请求方式
    const methods = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']

    // 注册方法到 this
    methods.forEach((method) => {
      this[method] = options => this._request(method, options)
    })
  }

  /**
   * 请求
   * @param {string} method='GET' 请求方式
   * @param {Object} options={} 选项
   * @return {Object}
   */
  _request (method = 'GET', options = {}) {
    let url = this.version ? `/${this.version}/${this.path}` : `/${this.path}`

    // GET
    if (options.params) {
      url = url + this._objToUrl(options.params)
    }

    return axios({
      headers: this.headers,
      method: method,
      baseURL: this.baseURL,
      url: url,
      data: options.data || {}
    })
  }

  /**
   * 对象转 URL
   * @param {Object} obj 待转化对象
   * @return {string}
   */
  _objToUrl (obj) {
    if (!obj || !Object.keys(obj).length) {
      return ''
    }

    return '?' + Object.keys(obj).map((key) => {
      return `${key}=${encodeURIComponent(obj[key])}`
    }).join('&')
  }

  /**
   * 附加路劲
   * @param {string} [path=''] 路劲
   */
  addPath (path = '') {
    this.path = this.path + '/' + path

    return this
  }

  /**
   * 添加 Headers
   * @param {Object} headers Headers
   */
  addHeaders (headers) {
    this.headers = {
      ...this.headers,
      ...headers
    }

    return this
  }

  /**
   * 路劲参数替换
   * @param {Object} options={} 路劲参数列表
   */
  replace (options = {}) {
    Object.keys(options).forEach((key) => {
      this.path = this.path.replace(new RegExp('{' + key + '}', 'img'), options[key])
    })

    return this
  }
}
