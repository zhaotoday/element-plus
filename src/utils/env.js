/**
 * 环境配置
 * @author 赵金添 <729234283@qq.com>
 * @example
 * import Env from '@/utils/env'
 * // 本地调试时，可强制设置当前环境
 * Env.current = Env.consts.PROD
 * console.log(Env.getAPI('some-api-module'))
 * console.log(Env.consts, Env.consts.DEV, Env.apis, Env.apis.cs)
 */
class Env {
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
   * 常用 API
   * @type {Object}
   * @property {string} apis.cs CS
   * @property {string} apis.csCDN CS CDN
   * @property {string} apis.uc UC
   * @property {string} apis.vOrgUC 虚拟组织 UC
   */
  static apis = {
    cs: _getCS(),
    csCDN: _getCSCDN(),
    uc: _getUC(),
    vOrgUC: _getVOrgUC()
  }

  /**
   * 当前环境
   * @type {string}
   */
  static current = _getCurrent()

  /**
   * 获取 API
   * @param {string} module 业务模块
   * @param {string} overrides 覆盖配置
   * @return {string}
   */
  static getAPI (module, overrides) {
    const {DEV, DEBUG, PRESSURE, BETA, PROD, AWS, AWSCA, DYEJIA} = Env.consts

    return ({
      [DEV]: `http://${module}.dev.web.nd`,
      [DEBUG]: `http://${module}.debug.web.nd`,
      [PRESSURE]: `https://${module}.qa.101.com`,
      [BETA]: `https://${module}.beta.101.com`,
      [PROD]: `https://${module}.sdp.101.com`,
      [AWS]: `https://${module}.aws.101.com`,
      [AWSCA]: `https://${module}.awsca.101.com`,
      [DYEJIA]: `https://${module}.dyejia.cn`,
      ...overrides
    })[Env.current]
  }
}

/**
 * 获取当前环境
 * @return {string}
 */
function _getCurrent () {
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
 * 获取 CS
 * @return {string}
 */
function _getCS () {
  const {DEV, DEBUG, PRESSURE, BETA, AWS, AWSCA} = Env.consts

  return (() => {
    switch (Env.current) {
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
function _getCSCDN () {
  const {DEV, DEBUG, PRESSURE, BETA, AWS, AWSCA} = Env.consts

  return (() => {
    switch (Env.current) {
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
function _getUC () {
  const {DEV, DEBUG, PRESSURE, BETA, AWS, AWSCA, DYEJIA} = Env.consts

  return (() => {
    switch (Env.current) {
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
function _getVOrgUC () {
  const {DEV, DEBUG, PRESSURE, BETA, PROD, AWS, AWSCA, DYEJIA} = Env.consts

  return (() => {
    switch (Env.current) {
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

export default Env
