export default {
  data () {
    return {
      listPageCurrent: 1,
      listSearchWhere: {}
    }
  },
  async beforeRouteUpdate (to, from, next) {
    const { query } = to

    this.listPageCurrent = +query.listPageCurrent || 1
    this.listSearchWhere = query.listSearchWhere
      ? JSON.parse(query.listSearchWhere)
      : null

    next()
  },
  async created () {
    const { query } = this.$route

    this.listPageCurrent = +query.listPageCurrent || 1
    this.listSearchWhere = query.listSearchWhere
      ? JSON.parse(query.listSearchWhere)
      : null
  }
}
