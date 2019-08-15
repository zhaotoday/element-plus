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
  },
  getOrderRoute ({ status, wxUserId }) {
    const listSearchWhere = encodeURIComponent(JSON.stringify({
      no: { $like: '' },
      payWay: { $eq: '' },
      status: status ? { $eq: status } : '',
      wxUserId: wxUserId ? { $eq: wxUserId } : '',
      startTime: { $eq: '' },
      endTime: { $eq: '' }
    }))

    return `/orders/orders/index?listSearchWhere=${listSearchWhere}`
  }
}
