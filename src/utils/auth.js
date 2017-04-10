import storage from './helpers/storageLite'

const TOKEN = 'TOKEN'

export default {
  name: 'auth',

  /**
   * 登录
   * @param {string} token 登录 token
   */
  login (token) {
    storage.set(TOKEN, token)
  },

  /**
   * 登出
   */
  logout () {
    storage.remove(TOKEN)
  },

  /**
   * 是否已登录
   * @return {boolean}
   */
  loggedIn () {
    return !!storage.get(TOKEN)
  }
}
