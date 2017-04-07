import log from './log'

/**
 * 初始化
 */
export default () => {
  if (window.Bridge) {
    window.Bridge.isWebview = true
  } else {
    window.Bridge = {
      isWebview: false,
      trigger() {
        log('Bridge', 'trigger', arguments)
      },
      addListener() {
        log('Bridge', 'addListener', arguments)
      },
      registerListener() {
        log('Bridge', 'registerListener', arguments)
      },
      unregisterListener() {
        log('Bridge', 'unregisterListener', arguments)
      }
    }
  }
}
