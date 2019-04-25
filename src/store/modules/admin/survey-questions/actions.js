import types from './types'
import Model from '@/models/admin/survey-questions'

export default {
  async getList ({ commit }, { query }) {
    const { data } = await new Model().GET({ query })
    commit(types.GET_LIST, { data })
    return data
  },

  async getDetail ({ commit }, { id }) {
    const { data } = await new Model().GET({ id })
    commit(types.GET_DETAIL, { data })
    return data
  },

  async post ({ commit }, { body }) {
    return new Model().POST({ body })
  },

  async put ({ commit }, { id, body }) {
    return new Model().PUT({ id, body })
  },

  async del ({ commit }, { id }) {
    return new Model().DELETE({ id })
  },

  postAction ({ commit }, { query, body }) {
    return new Model().addPath('actions').POST({ query, body })
  },

  resetList ({ commit }, payload) {
    commit(types.RESET_LIST, payload)
  }
}
