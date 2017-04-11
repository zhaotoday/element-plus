import REST from '@/utils/rest'
import consts from '@/utils/consts'

// 模拟数据
let res = {
  data: {
    total: 10,
    items: [
      {
        id: 1,
        title: 'Vue'
      }
    ]
  }
}

/**
 * 模拟接口
 */
export default class extends REST {
  constructor () {
    super()

    this.baseURL = consts.ARTICLE_API
    this.path = 'articles'
  }

  /**
   * 获取列表
   * @return {Promise}
   */
  GET () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res)
      }, 2000)
    })
  }

  /**
   * 新增
   * @param {Object} newItem 新增项
   * @return {Promise}
   */
  POST (newItem) {
    return new Promise((resolve) => {
      res.data.items.push(newItem)
      resolve(res)
    })
  }
}
