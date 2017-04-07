export default window.Bridge ? window.Bridge.require('sdp.dialog') : {
  showAlert(options) {
    alert(options.message)
  }
}
