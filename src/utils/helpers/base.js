import consts from '@/utils/consts'
import helpers from 'jt-helpers'

export default {
  ...helpers,
  /**
   * 获取图片地址
   */
  getImageURLById (id) {
    return `${consts.BASE_URL}/apis/v1/files/${id}`
  },
  getRoutePrefix (params) {
    const { topLevelMenu, secondLevelMenu, alias } = params
    return `/${topLevelMenu}/${secondLevelMenu}/${alias}`
  },
  getItem (items, key, val) {
    return items && items.length
      ? (items.find(item => item[key] === val) || {})
      : {}
  },
  getItemById (items, id) {
    return items && items.length
      ? (items.find(item => +item.id === +id) || {})
      : {}
  }
}
