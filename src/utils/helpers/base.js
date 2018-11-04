import consts from '@/utils/consts'
import helpers from 'jt-helpers'

export default {
  ...helpers,
  getFileURLById (id) {
    return `${consts.BASE_URL}/apis/v1/files/${id}`
  },
  getItemById (items, id) {
    return items && items.length
      ? (items.find(item => +item.id === +id) || {})
      : {}
  }
}
