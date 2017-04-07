export default {
  /**
   * 判断是否为空
   * @param {string} value 字符串
   * @return {boolean}
   */
  isEmpty (value) {
    return value === null || value === undefined || value.trim() === ''
  }
}
