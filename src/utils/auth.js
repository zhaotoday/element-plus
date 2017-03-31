import storage from './helpers/storage'

const TOKEN = 'TOKEN'
const USER = 'USER'

let token = null
let user = null

export default {
  /**
   * 是否登录
   */
  isLogin() {
    return !!this.getToken()
  },

  /**
   * 设置 token
   * @param value
   */
  setToken(value) {
    token = value
    storage.set(TOKEN, token)
  },

  /**
   * 获取 token
   */
  getToken() {
    return token || storage.get(TOKEN)
  },

  /**
   * 销毁 token 和 user
   */
  destroy() {
    token = user = null
    storage.remove(TOKEN)
    storage.remove(USER)
  }
}
