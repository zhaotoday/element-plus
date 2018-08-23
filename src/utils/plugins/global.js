import time from 'jt-time'
import helpers from '../helpers/base'
import consts from '../consts/index'

export default {
  install (Vue) {
    Vue.prototype.consts = consts
    Vue.prototype.helpers = helpers
    Vue.prototype.time = time

    Vue.filter('time', val => time.getTime(val))
    Vue.filter('date', val => time.getDate(val))
  }
}
