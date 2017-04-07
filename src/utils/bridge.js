import * as userAgent from './userAgent'

import init from './factory/utils/init'
import uc from './factory/uc'
import network from './factory/network'
import dialog from './factory/dialog'
import appfactory from './factory/appfactory'
import payment from './factory/payment'
import restDao from './factory/restDao'

init()

export const hideMoreMenu = () => {
  userAgent.terminal() === 'ios' ? appfactory.setMenuVisible({'_maf_menu': false}) : setTimeout(() => {
    appfactory.setMenuVisible({'_maf_menu': false})
  }, 300)
}

export {
  uc,
  network,
  appfactory,
  payment,
  dialog,
  restDao
}
