import REST from '../utils/rest'
import consts from '../utils/consts'
import restHelpers from '../utils/helpers/restHelpers'

export default class extends REST {
  constructor () {
    super()
    this.baseURL = consts.API_URL
    this.path = 'actions'
    this.errorHandler = restHelpers.errorHandler
  }
}
