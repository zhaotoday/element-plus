import axios from 'axios'
import json from 'json-bigint'
import auth from './utils/auth'

const PROTECTION_PREFIX = /^\)\]\}',?\n/

/**
 * RESTDao class
 */
class RESTDao {
  constructor() {
    const methods = ['get', 'post', 'patch']

    methods.forEach((value) => {
      this[value] = options => this._request(options.rest)
    })
  }

  /**
   * 接口请求
   */
  _request({authed, baseURL = '', url = '', data = {}, headers = {}, method = 'GET'}) {
    if (authed)
      headers.Authorization = auth.getAuth(method, url, baseURL.split('://')[1])

    return axios({
      responseType: 'text',
      transformResponse: [function (responseText) {
        let data = responseText.replace(PROTECTION_PREFIX, '')
        try {
          data = json.parse(data)
        } catch (e) {
        }
        return data
      }],
      method,
      baseURL,
      url,
      data,
      headers
    })
  }
}

export default window.Bridge ? window.Bridge.require('sdp.restDao').promise() : new RESTDao()
