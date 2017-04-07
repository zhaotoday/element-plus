import Sha from 'nd-sha'
import store from '../../store'

const _rnd = (min, max) => {
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  let range = max ? max - min : min
  let str = ''
  let length = arr.length - 1

  for (let i = 0; i < range; i++) {
    str += arr[Math.round(Math.random() * length)]
  }

  return str
}

const _getNonce = () => {
  return `${new Date().getTime()}:${_rnd(8)}`
}

const _getMacContent = (nonce, method, url, host) => {
  return [nonce, method, url, host, ''].join('\n')
}

const _getMac = (nonce, method, url, host) => {
  const token = store.token.get()

  return new Sha(_getMacContent(nonce, method, url, host), 'TEXT')
    .getHMAC(token.mac_key, 'TEXT', 'SHA-256', 'B64')
}

const getAuth = (method, url, host) => {
  const nonce = _getNonce()
  const token = store.token.get()

  return `MAC id="${token.access_token}",nonce="${nonce}",mac="${_getMac(nonce, method, url, host)}"`
}

const getToken = (method, url, host) => {
  const nonce = _getNonce()
  const mac = _getMac(nonce, method, url, host)
  const token = store.token.get()

  return window.btoa(`${mac}\r\n${token.access_token}\r\n${nonce}`)
}

export default {
  getAuth,
  getToken
}
