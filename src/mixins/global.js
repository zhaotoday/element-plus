import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      resetState: 'resetState'
    }),
    addLog ({ id, method, model, body } = {}) {
      this.$store.dispatch('logs/post', {
        body: {
          managerId: this.$auth.get()['user'].id,
          alias: 'logs',
          id,
          method,
          model,
          body
        }
      })
    }
  }
}
