import REST from '@/utils/rest'
import consts from '@/utils/consts'

/**
 * 模拟接口
 */
export default class extends REST {
  constructor () {
    super()

    this.baseURL = consts.ARTICLE_API
    this.path = 'articles'
  }
}
