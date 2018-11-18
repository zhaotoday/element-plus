import types from './types'
import Model from '../../../models/articles'

export default {
  async getList ({ commit }, { query }) {
    const res = await new Model().GET({ query })

    commit(types.GET_LIST, {
      data: res.data
    })

    return res.data
  },

  async getDetail ({ commit }, { id }) {
    const res = await new Model().GET({ id })

    commit(types.GET_DETAIL, {
      data: res.data
    })

    return res.data
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
  }
}
