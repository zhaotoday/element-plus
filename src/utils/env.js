/**
 * 环境配置
 * @author 赵金添 <729234283@qq.com>
 */
export default class Env {
  /**
   * 常量
   * @type {Object}
   * @property {string} consts.HOST 主机
   * @property {string} consts.HOSTNAME 主机名
   * @property {string} consts.DEV 开发环境
   * @property {string} consts.DEBUG 测试环境
   * @property {string} consts.PRESSURE 压测环境
   * @property {string} consts.BETA 预生产环境
   * @property {string} consts.PROD 生产环境
   * @property {string} consts.AWS AWS 环境
   * @property {string} consts.AWSCA AWSCA 环境
   * @property {string} consts.DYEJIA DYEJIA 环境
   */
  static consts = {
    HOST: window.location.host,
    HOSTNAME: window.location.hostname,
    DEV: 'DEV',
    DEBUG: 'DEBUG',
    PRESSURE: 'PRESSURE',
    BETA: 'BETA',
    PROD: 'PROD',
    AWS: 'AWS',
    AWSCA: 'AWSCA',
    DYEJIA: 'DYEJIA'
  }

  /**
   * 获取当前环境
   * @type {string}
   */
  get current() {
    const {HOSTNAME, DEV, DEBUG, PRESSURE, BETA, PROD, AWS, AWSCA, DYEJIA} = ENV.consts

    switch (HOSTNAME) {
      case '127.0.0.1':
      case 'localhost':
        return DEV
      default:
        if (/(^192\.168|\.dev\.web\.nd$)/.test(HOSTNAME)) {
          return DEV
        }
        if (/\.debug\.web\.nd$/.test(HOSTNAME)) {
          return DEBUG
        }
        if (/\.qa\.101\.com$/.test(HOSTNAME)) {
          return PRESSURE
        }
        if (/\.beta\.101\.com$/.test(HOSTNAME)) {
          return BETA
        }
        if (/\.aws\.101\.com/.test(HOSTNAME)) {
          return AWS
        }
        if (/\.awsca\.101\.com/.test(HOSTNAME)) {
          return AWSCA
        }
        if (/im-ent\.dyejia\.cn/.test(HOSTNAME)) {
          return DYEJIA
        }
        return PROD
    }
  }

  /**
   * 获取 UC
   * @return {string}
   */
  get uc() {

    return (() => {
      const {DEV, DEBUG, PRESSURE, BETA, PROD, AWS, AWSCA, DYEJIA} = ENV.consts

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
