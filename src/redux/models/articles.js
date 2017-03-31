import REST from 'utils/rest'
import consts from 'utils/consts'

export default class extends REST {
  constructor() {
    super()

    this.baseURL = consts.API_URL
    this.version = 'v1.0'
    this.path = 'articles'
    this.headers = {
      Authorization: 'abc'
    }
  }
}
