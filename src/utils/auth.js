import storage from 'apples/libs/storage'

const MANAGER = 'manager'
const TOKEN = 'token'

export default {
  name: 'auth',

  /**
   * 获取 auth，返回：管理员信息和 token
   * @return {Object}
   */
  get () {
    return {
      [MANAGER]: storage.get(MANAGER),
      [TOKEN]: storage.get(TOKEN)
    }
  },

  /**
   * 登录
   * @param {string} manager 登录管理员
   * @param {string} token 登录 token
   */
  login ({manager, token}) {
    storage.set(MANAGER, manager)
    storage.set(TOKEN, `Bearer ${token}`)
  },

  /**
   * 登出
   */
  logout () {
    storage.remove(MANAGER)
    storage.remove(TOKEN)
  },

  /**
   * 是否已登录
   * @return {boolean}
   */
  loggedIn () {
    return !!storage.get(MANAGER) && !!storage.get(TOKEN)
  }
}
