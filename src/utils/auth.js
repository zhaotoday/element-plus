import storage from 'jt-storage'

const USER = 'user'
const TOKEN = 'token'

export default {
  name: 'auth',

  /**
   * 获取 auth，返回：管理员信息和 token
   * @return {Object}
   */
  get () {
    return {
      [USER]: storage.get(USER),
      [TOKEN]: storage.get(TOKEN)
    }
  },

  /**
   * 登录
   * @param {string} user 登录管理员
   * @param {string} token 登录 token
   */
  login ({ user, token }) {
    storage.set(USER, user)
    storage.set(TOKEN, `Bearer ${token}`)
  },

  /**
   * 登出
   */
  logout () {
    storage.remove(USER)
    storage.remove(TOKEN)
  },

  /**
   * 是否已登录
   * @return {boolean}
   */
  loggedIn () {
    return !!storage.get(USER) && !!storage.get(TOKEN)
  }
}
