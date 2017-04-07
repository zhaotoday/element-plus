import * as storage from './helpers/storage'
import urlParams from './helpers/urlParams'
import {Base64} from 'js-base64'

// 群组 ID
const GROUP_ID = 'gid'
// 前缀，唯一标识
const PREFIX = `${urlParams[GROUP_ID]}-`

// URL 参数
const url = {
  groupId: urlParams[GROUP_ID]
}

// token
const token = {
  set(value) {
    storage.set(`${PREFIX}token`, value)
  },
  get() {
    return storage.get(`${PREFIX}token`)
  }
}

// userId
const userId = {
  set(value) {
    storage.set(`${PREFIX}userId`, value)
  },
  get() {
    return storage.get(`${PREFIX}userId`)
  }
}

// URL token
const urlToken = (() => {
  const tokens = Base64.decode(urlParams.token).split('\r\n')

  return {
    mac: tokens[0],
    access_token: tokens[1],
    nonce: tokens[2]
  }
})()

export default {
  url,
  userId,
  token,
  urlToken
}
