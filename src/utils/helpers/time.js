import 'date-format-lite'

const DATE_TIME_FORMATTER = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMATTER = 'YYYY-MM-DD'
const TIME_FORMATTER = 'HH:mm:ss'

export default {
  /**
   * 格式化时间
   * @param dateTime {string} 时间
   * @param formatter {string} 格式
   */
  format(dateTime, formatter) {
    if (!dateTime) return ''
    return dateTime.date(formatter)
  },

  /**
   * 获取：年-月-日 时:分:秒
   * @param dateTime {string} 时间
   */
  getDateTime(dateTime) {
    return this.format(dateTime, DATE_TIME_FORMATTER)
  },

  /**
   * 获取：年-月-日
   * @param dateTime {string} 时间
   */
  getDate(dateTime) {
    return this.format(dateTime, DATE_FORMATTER)
  },

  /**
   * 获取：时:分:秒
   * @param dateTime {string} 时间
   */
  getTime(dateTime) {
    return this.format(dateTime, TIME_FORMATTER)
  }
}
