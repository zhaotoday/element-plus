export default window.Bridge ? window.Bridge.require('sdp.network') : {
  getStatus() {
    return '!Unknown'
  }
}
