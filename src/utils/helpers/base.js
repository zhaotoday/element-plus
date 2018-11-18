import consts from '@/utils/consts'
import helpers from 'jt-helpers'

export default {
  ...helpers,
  goBack () {
    window.history.go(-1)
  },
  open (url) {
    window.open(url)
  },
  deepCopy (obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  getFileURLById (id) {
    return `${consts.BASE_URL}/apis/v1/files/${id}`
  },
  getItemById (items, id) {
    return items && items.length
      ? (items.find(item => +item.id === +id) || {})
      : {}
  }
}
