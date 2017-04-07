/**
 * @file 基于 i18next 的国际化简单封装。
 * @author 赵金添 <729234283@qq.com>
 */

import i18next from 'i18next'

export default class I18N {
  /**
   * 构造函数
   * @param lng {string} 默认语言
   */
  constructor(lng) {
    this.lng = lng || this.getBrowserLng()
    this.ns = 'translation'
  }

  /**
   * 初始化
   */
  init() {
    i18next.init({
      debug: true,
      lng: this.lng,
      fallbackNS: 'translation',
      load: 'all'
    })

    return this
  }

  /**
   * 添加语言资源
   * @param ns {string} 业务模块
   * @param req {function} 语言资源
   */
  addResources = (ns, req) => {
    ns = ns || this.ns

    req.keys().forEach((path) => {
      const resources = req(path)
      const paths = path.split('/')
      const lng = paths[1]

      i18next.addResourceBundle(lng, ns, resources, true, true)
    })

    return this
  }

  /**
   * 获取浏览器语言环境
   */
  getBrowserLng() {
    return navigator.language || navigator.browserLanguage
  }

  /**
   * 切换到某种语言
   * @param lng {string} 语言
   */
  switchTo(lng) {
    i18next.changeLanguage(lng)
    this.lng = lng

    return this
  }

  /**
   * 获取翻译
   * @param ns {string} 业务模块
   */
  getT(ns) {
    return i18next.getFixedT(this.lng, ns || this.ns)
  }
}
