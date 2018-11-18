import store from '../store'
import { mapActions } from 'vuex'

export default {
  beforeRouteEnter (to, from, next) {
    store.dispatch('resetState', {})
    next()
  },
  methods: mapActions({
    resetState: 'resetState'
  })
}
