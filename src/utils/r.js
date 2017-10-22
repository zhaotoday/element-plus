import REST from './rest'
import iView from 'iview'

export default class extends REST {
  /**
   * 重写父类 request 方法，按业务场景定制功能
   * @override
   */
  request (method = 'GET', options = {}) {
    iView.Spin.show()

    return new Promise((resolve, reject) => {
      super.request(method, options)
        .then(res => {
          iView.Spin.hide()
          // 在这里可对 res 进行包装
          resolve(res.data)
        })
        .catch(res => {
          // 全局错误提示
          iView.Message.error(res.response.data.error.message)
          iView.Spin.hide()
        })
    })
  }
}
