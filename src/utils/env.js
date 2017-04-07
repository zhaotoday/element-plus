/**
 * 环境配置
 * @author 赵金添 <729234283@qq.com>
 * @example
 * import Env from '@/utils/env'
 * const env = new Env({
 *   current: Env.consts.PROD
 * })
 * console.log(env.getAPI('some-api-module'))
 */
class Env {
  /**
   * 构造方法
   * @param {string} current 新建对象时，设置当前环境（仅限用于本地调试）
   */
  constructor ({current}) {
    /**
     * 当前环境
     * @type {string}
     */
    this.current = current || this._getCurrent()

    /**
     * CS
     * @type {string}
     */
    this.cs = this._getCS()

    /**
     * CS CDN
     * @type {string}
     */
    this.csCDN = this._getCSCDN()

    /**
     * UC
     * @type {string}
     */
    this.uc = this._getUC()

    /**
     * 虚拟组织 UC
     * @type {string}
     */
    this.vOrgUC = this._getVOrgUC()

    /**
     * 用户头像
     * @type {string}
     */
    this.userFace = this._getUserFace()
  }

  static a = 22

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

  static current = Env.getCurrent()

  /**
   * 获取当前环境
   * @return {string}
   */
  static getCurrent () {
    const {HOSTNAME, DEV, DEBUG, PRESSURE, BETA, PROD, AWS, AWSCA, DYEJIA} = Env.consts

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
        if (/\.dyejia\.cn/.test(HOSTNAME)) {
          return DYEJIA
        }
        return PROD
    }
  }

  /**
   * CS
   * @return {string}
   */
  get cs () {
    const {DEV, DEBUG, PRESSURE, BETA, AWS, AWSCA} = Env.consts

    return (() => {
      switch (this.current) {
        case DEV:
        case DEBUG:
        case BETA:
        case PRESSURE:
          return 'https://betacs.101.com'
        case AWS:
          return 'https://awscs.101.com'
        case AWSCA:
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
  _getCSCDN () {
    const {DEV, DEBUG, PRESSURE, BETA, AWS, AWSCA} = Env.consts

    return (() => {
      switch (this.current) {
        case DEV:
        case DEBUG:
        case BETA:
        case PRESSURE:
          return 'https://betacs.101.com'
        case AWS:
          return 'https://awscs.101.com'
        case AWSCA:
          return 'https://cs-awsca.101.com'
        default:
          return 'https://cdncs.101.com'
      }
    })()
  }

  /**
   * 获取 UC
   * @return {string}
   */
  _getUC () {
    const {DEV, DEBUG, PRESSURE, BETA, AWS, AWSCA, DYEJIA} = Env.consts

    return (() => {
      switch (this.current) {
        case DEV:
        case DEBUG:
        case BETA:
        case PRESSURE:
          return 'https://ucbetapi.101.com'
        case AWS:
          return 'https://awsuc.101.com'
        case AWSCA:
          return 'https://uc-awsca.101.com'
        case DYEJIA:
          return 'https://aqapi.dyejia.cn'
        default:
          return 'https://aqapi.101.com'
      }
    })()
  }

  /**
   * 获取虚拟组织 UC
   * @return {string}
   */
  _getVOrgUC () {
    const {DEV, DEBUG, PRESSURE, BETA, PROD, AWS, AWSCA, DYEJIA} = Env.consts

    return (() => {
      switch (this.current) {
        case DEV:
          return 'https://ucvorg-beta.101.com'
        case DEBUG:
          return 'http://virtual-organization.debug.web.nd'
        case PRESSURE:
          return 'http://virtual-organization.qa.web.sdp.101.com'
        case BETA:
          return 'https://ucvorg-beta.101.com'
        case PROD:
          return 'https://ucvorg.101.com'
        case AWS:
          return 'http://virtual-organization.aws.101.com'
        case AWSCA:
          return 'http://vorg-awsca.101.com'
        case DYEJIA:
          return 'https://vorg.dyejia.cn'
        default:
          return 'https://ucvorg.101.com'
      }
    })()
  }

  /**
   * 获取用户头像
   * @return {string}
   */
  _getUserFace () {
    return this.csCDN + '/v0.1/static/cscommon/avatar'
  }

  /**
   * 获取接口地址
   * @return {string}
   */
  getAPI (prefix, overrides) {
    const {DEV, DEBUG, PRESSURE, BETA, PROD, AWS, AWSCA, DYEJIA} = Env.consts

    return ({
      [DEV]: `http://${prefix}.dev.web.nd`,
      [DEBUG]: `http://${prefix}.debug.web.nd`,
      [PRESSURE]: `https://${prefix}.qa.101.com`,
      [BETA]: `https://${prefix}.beta.101.com`,
      [PROD]: `https://${prefix}.sdp.101.com`,
      [AWS]: `https://${prefix}.aws.101.com`,
      [AWSCA]: `https://${prefix}.awsca.101.com`,
      [DYEJIA]: `https://${prefix}.dyejia.cn`,
      ...overrides
    })[this.current]
  }

  /**
   * 将当前环境强制设置为某个环境（仅限用于本地调试）
   * @param {string} value 环境
   */
  setCurrentTo (value) {
    this.current = value
  }
}

// Env.current = Env.getCurrent()
console.log(Env.current, 3344)

export default Env
