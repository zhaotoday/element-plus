const localStorage = window.localStorage

export default {
  /**
   * 设置
   * @param {string} key 键
   * @data {object} value 值
   */
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  /**
   * 获取
   * @param {string} key 键
   */
  get(key) {
    return JSON.parse(localStorage.getItem(key)) || {}
  },

  /**
   * 移除
   * @param {string} key 键
   */
  remove(key) {
    localStorage.removeItem(key)
  },

  /**
   * 清空
   */
  clear() {
    localStorage.clear()
  }
}
