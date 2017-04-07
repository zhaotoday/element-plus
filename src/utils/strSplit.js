'use strict'

export default {


  GetLength: function (str) {
    ///<summary>获得字符串实际长度，中文2，英文1</summary>
    ///<param name="str">要获得长度的字符串</param>
    let realLength = 0
    let len = str.length
    let charCode = -1
    for (let i = 0; i < len; i++) {
      charCode = str.charCodeAt(i)
      if (charCode >= 0 && charCode <= 128) {
        realLength += 1
      } else {
        realLength += 2
      }
    }
    return realLength
  },

  /**
   * js截取字符串，中英文都能用
   * @param str：需要截取的字符串
   * @param len: 需要截取的长度
   */
  cutstr: function (str, len) {
    let strLength = 0
    let strLen = 0
    let strCut = ''
    strLen = str.length
    for (let i = 0; i < strLen; i++) {
      let a = str.charAt(i)
      strLength++
      if (escape(a).length > 4) {
        // 中文字符的长度经编码之后大于4
        strLength++
      }
      strCut = strCut.concat(a)
      if (strLength >= len) {
        strCut = strCut.concat('...')
        return strCut
      }
    }
    // 如果给定字符串小于指定长度，则返回源字符串
    if (strLength < len) {
      return str
    }
  }
}
