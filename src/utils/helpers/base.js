export default {
  /**
   * 判断是否为空
   * @param val {string} 字符串
   */
  isEmpty(val) {
    return val === null || val === undefined || val.trim() === ''
  }
}
