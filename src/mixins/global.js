import store from '../store'
import { mapActions } from 'vuex'

export default {
  methods: mapActions({
    resetState: 'resetState'
  }),
  beforeRouteEnter (to, from, next) {
    store.dispatch('resetState', {})
    next()
  }
}
