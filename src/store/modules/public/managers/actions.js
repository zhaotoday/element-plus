import Model from '@/models/public/manangers'

export default {
  postAction ({ commit }, { query, body }) {
    return new Model().addPath('actions').POST({ query, body })
  }
}
