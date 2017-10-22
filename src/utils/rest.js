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
      this[method] = options => this.request(method, options)
    })
  }

  /**
   * 请求
   * @param {string} method='GET' 请求方式
   * @param {Object} [options={}] 选项
   * @param {string} [options.id=''] 资源唯一标示，一般是 ID
   * @param {Object} [options.query=null] GET 参数
   * @param {Object} [options.body=null] POST/PUT/PATCH 数据
   * @return {Object}
   */
  request (method = 'GET', options = {}) {
    const {id = '', query = null, body = null} = options
    let url = this.version ? `/${this.version}/${this.path}` : `/${this.path}`

    if (id) {
      url = `${url}/${id}`
    }

    // GET
    if (query) {
      url = `${url}${this.toURL(query)}`
    }

    return new Promise((resolve, reject) => {
      axios({
        baseURL: this.baseURL,
        headers: this.headers,
        method,
        url,
        data: body
      }).then(resolve).catch(reject)
    })
  }

  /**
   * 对象转 URL
   * @param {Object} obj 待转化对象
   * @return {string}
   */
  toURL (obj) {
    if (!obj || !Object.keys(obj).length) {
      return ''
    }

    return '?' + Object.keys(obj).map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&')
  }

  /**
   * 附加路劲
   * @param {string} [path=''] 路劲
   */
  addPath (path = '') {
    this.path = `${this.path}/${path}`

    return this
  }

  /**
   * 添加 Headers
   * @param {Object} headers Headers
   */
  addHeaders (headers) {
    Object.assign(this.headers, headers)

    return this
  }

  /**
   * 路劲参数替换
   * @param {Object} options={} 路劲参数列表
   */
  replace (options = {}) {
    Object.keys(options).forEach(value => {
      this.path = this.path.replace(new RegExp(`{${value}}`, 'img'), options[value])
    })

    return this
  }
}
