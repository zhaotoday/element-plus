import 'date-format-lite'

const DATE_TIME_FORMATTER = 'YYYY-MM-DD hh:mm:ss'
const DATE_FORMATTER = 'YYYY-MM-DD'
const TIME_FORMATTER = 'hh:mm:ss'

export default {
  name: 'time',

  /**
   * 格式化时间
   * @param {string} time 时间
   * @param {string} formatter 格式
   * @return {string}
   */
  format (time, formatter) {
    return time ? time.date(formatter) : ''
  },

  /**
   * 年-月-日 时:分:秒
   * @param {string} time 时间
   * @return {string}
   */
  getDateTime (time) {
    return this.format(time, DATE_TIME_FORMATTER)
  },

  /**
   * 年-月-日
   * @param {string} time 时间
   * @return {string}
   */
  getDate (time) {
    return this.format(time, DATE_FORMATTER)
  },

  /**
   * 时:分:秒
   * @param {string} time 时间
   * @return {string}
   */
  getTime (time) {
    return this.format(time, TIME_FORMATTER)
  },

  /**
   * 在 time 基础上加 unit 秒、分钟...
   * @param {string} time 时间
   * @param {string} num 数量
   * @param {string} unit 单位（eg: seconds, minutes, hours, days, weeks, months, years）
   */
  add (time, num, unit) {
    return this.format(time).add(num, unit)
  }
}
