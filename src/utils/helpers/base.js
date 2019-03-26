import consts from '@/utils/consts'
import helpers from 'jt-helpers'

export default {
  ...helpers,
  goBack () {
    window.history.go(-1)
  },
  deepCopy (obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  getFileURLById (id) {
    return `${consts.BASE_URL}/api/v1/public/files/${id}`
  },
  getItemById (items, id) {
    return items && items.length
      ? (items.find(item => +item.id === +id) || {})
      : {}
  },
  getItem (items, key, val) {
    return items && items.length
      ? (items.find(item => item[key] === val) || {})
      : {}
  },
  getOption (options, value) {
    return options.find(item => item.value === value) || {}
  }
}
