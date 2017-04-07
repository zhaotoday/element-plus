import store from '../store'

export default window.Bridge ? window.Bridge.require('UC') : {
  getCurrentUserId() {
    return store.userId.get()
  }
}
