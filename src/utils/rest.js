import REST from 'jt-rest'
import iView from 'iview'
import restHelpers from './helpers/restHelpers'

export default class extends REST {
  /**
   * 重写父类 request 方法，按业务场景定制功能
   * @override
   */
  request (method = 'GET', options = {}) {
    if (!options.query) {
      options.query = {}
    }

    // 转 options.query.where 对象为字符串
    if (options.query.where) {
      options.query.where = restHelpers.whereToStr(options.query.where)
    }

    if (method === 'GET') {
      options.query._ = new Date().getTime()
    }

    iView.Spin.show()

    return new Promise(resolve => {
      super.request(method, options)
        .then(res => {
          iView.Spin.hide()
          // 在这里可对 res 进行包装
          resolve(res.data)
        })
        .catch(res => {
          iView.Spin.hide()
          // 全局错误提示
          iView.Message.error(res.response.data.error.message)
        })
    })
  }
}
