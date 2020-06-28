export default {
  data () {
    return {
      alias: '',
      id: 0
    }
  },
  async beforeRouteUpdate (to, from, next) {
    this.alias = to.params.alias
    this.id = to.params.id

    next()
  },
  async created () {
    const { alias, id } = this.$route.params

    this.alias = alias
    this.id = id
  }
}
