import REST from '@/utils/rest'
import consts from '@/utils/consts'

export default class extends REST {
  constructor () {
    super()

    this.baseURL = consts.PUBLIC_API_URL
    this.path = 'managers'
  }
}
