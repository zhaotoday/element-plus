import types from './types'
import Model from '@/models/admin/settings'

export default {
  async getDetail ({ commit }, { id }) {
    const res = await new Model().GET({ id })

    commit(types.GET_DETAIL, {
      data: res.data
    })

    return res.data
  },

  async put ({ commit }, { id, body }) {
    return new Model().PUT({ id, body })
  }
}
