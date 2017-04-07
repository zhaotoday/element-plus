/**
 * @class 环境配置
 */
class ENV {
  /**
   * @static {string} 主机
   */
  static host = window.location.host

  /**
   * @static {string} 主机名
   */
  static hostname = window.location.hostname

  /**
   * @static {string} 开发环境
   */
  static dev = 'dev'

  /**
   * @static {string} 测试环境
   */
  static debug = 'debug'

  /**
   * @static {string} 压测环境
   */
  static pressure = 'pressure'

  /**
   * @static {string} 旧预生产环境
   */
  static oldBeta = 'oldBeta'

  /**
   * @static {string} 预生产环境
   */
  static beta = 'beta'

  /**
   * @static {string} 生产环境
   */
  static prod = 'prod'

  /**
   * @static {string} aws 环境
   */
  static aws = 'aws'

  /**
   * @static {string} awsca 环境
   */
  static awsca = 'awsca'

  /**
   * @static {string} 党员 e 家环境
   */
  static dyejia = 'dyejia'

  /**
   * 获取当前环境
   * @return {string}
   */
  get current() {
    const hostname = ENV.hostname

    switch (hostname) {
      case '127.0.0.1':
      case 'localhost':
        return ENV.dev
      default:
        if (/(^192\.168|\.dev\.web\.nd$)/.test(hostname)) {
          return ENV.dev
        }
        if (/\.debug\.web\.nd$/.test(hostname)) {
          return ENV.debug
        }
        if (/\.qa\.101\.com$/.test(hostname)) {
          return ENV.pressure
        }
        if (/\.beta\.web\.sdp\.101\.com$/.test(hostname)) {
          return ENV.oldBeta
        }
        if (/\.beta\.101\.com$/.test(hostname)) {
          return ENV.beta
        }
        if (/\.aws\.101\.com/.test(hostname)) {
          return ENV.aws
        }
        if (/\.awsca\.101\.com/.test(hostname)) {
          return ENV.awsca
        }
        if (/im-ent\.dyejia\.cn/.test(hostname)) {
          return ENV.dyejia
        }
        return ENV.prod
    }
  }

  /**
   * 获取 UC
   * @return {string}
   */
  get uc() {
    return (() => {
      switch (this.current) {
        case ENV.dev:
        case ENV.debug:
        case ENV.beta:
        case ENV.pressure:
          return 'https://ucbetapi.101.com'
        case ENV.oldBeta:
          return 'http://101uccenter.beta.web.sdp.101.com'
        case ENV.aws:
          return 'https://awsuc.101.com'
        case ENV.awsca:
          return 'https://uc-awsca.101.com'
        case ENV.dyejia:
          return 'https://aqapi.dyejia.cn'
        default:
          return 'https://aqapi.101.com'
      }
    })()
  }

  /**
   * 获取 CS
   * @return {string}
   */
  get cs() {
    return (() => {
      switch (this.current) {
        case ENV.dev:
        case ENV.debug:
        case ENV.beta:
        case ENV.pressure:
          return 'https://betacs.101.com'
        case ENV.oldBeta:
          return 'http://betacs.101.com'
        case ENV.aws:
          return 'https://awscs.101.com'
        case ENV.awsca:
          return 'https://cs-awsca.101.com'
        default:
          return 'https://cs.101.com'
      }
    })()
  }

  /**
   * 获取 CS CDN
   * @return {string}
   */
  get csCDN() {
    return (() => {
      switch (this.current) {
        case ENV.dev:
        case ENV.debug:
        case ENV.beta:
        case ENV.pressure:
          return 'https://betacs.101.com'
        case ENV.oldBeta:
          return 'http://betacs.101.com'
        case ENV.aws:
          return 'https://awscs.101.com'
        case ENV.awsca:
          return 'https://cs-awsca.101.com'
        default:
          return 'https://cdncs.101.com'
      }
    })()
  }

  /**
   * 获取虚拟组织 UC
   * @return {string}
   */
  get vOrgUC() {
    return (() => {
      switch (this.current) {
        case ENV.dev:
          return 'https://ucvorg-beta.101.com'
        case ENV.debug:
          return 'http://virtual-organization.debug.web.nd'
        case ENV.pressure:
          return 'http://virtual-organization.qa.web.sdp.101.com'
        case ENV.prod:
          return 'https://ucvorg.101.com'
        case ENV.aws:
          return 'http://virtual-organization.aws.101.com'
        case ENV.awsca:
          return 'http://vorg-awsca.101.com'
        case ENV.oldBeta:
        case ENV.beta:
          return 'https://ucvorg-beta.101.com'
        case ENV.dyejia:
          return 'https://vorg.dyejia.cn'
        default:
          return 'https://ucvorg.101.com'
      }
    })()
  }

  /**
   * 用户头像
   * @return {string}
   */
  get userFace() {
    return this.csCDN + '/v0.1/static/cscommon/avatar'
  }

  /**
   * 获取接口地址
   * @return {string}
   */
  getAPI(prefix, overrides) {
    return ({
      [ENV.dev]: `http://${prefix}.dev.web.nd`,
      [ENV.debug]: `http://${prefix}.debug.web.nd`,
      [ENV.pressure]: `https://${prefix}.qa.101.com`,
      [ENV.oldBeta]: `http://${prefix}.beta.web.sdp.101.com`,
      [ENV.beta]: `https://${prefix}.beta.101.com`,
      [ENV.prod]: `https://${prefix}.sdp.101.com`,
      [ENV.aws]: `https://${prefix}.aws.101.com`,
      [ENV.awsca]: `https://${prefix}.awsca.101.com`,
      [ENV.dyejia]: `https://${prefix}.dyejia.cn`,
      ...overrides
    })[this.current]
  }
}

export default ENV
