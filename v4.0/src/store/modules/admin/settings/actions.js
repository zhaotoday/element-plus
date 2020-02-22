import types from './types'
import Model from '@/models/admin/settings'

export default {
  async getDetail ({ commit }, { id }) {
    const { data } = await new Model().GET({ id })
    commit(types.GET_DETAIL, { data })
    return data
  },

  async put ({ commit }, { id, body }) {
    return new Model().PUT({ id, body })
  }
}
