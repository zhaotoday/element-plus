import log from './utils/log'
import promise from './utils/promise'

export default window.Bridge ? window.Bridge.require('sdp.appfactory').promise() : {
  registerWebviewMenu() {
    log('sdp.appfactory', 'registerWebviewMenu', arguments)
    return promise
  },
  unRegisterWebviewMenu() {
    log('sdp.appfactory', 'unRegisterWebviewMenu', arguments)
    return promise
  },
  setMenuVisible() {
    log('sdp.appfactory', 'setMenuVisible', arguments)
    return promise
  }
}
