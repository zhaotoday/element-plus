import Model from '@/models/categories'

export default {
  data () {
    return {
      allCategoriesList: {}
    }
  },
  async created () {
    this.allCategoriesList = await this.getAllCategoriesList()
  },
  methods: {
    async getAllCategoriesList () {
      const res = await new Model().GET({
        query: {
          offset: 0,
          limit: 2000,
          where: {
            alias: this.alias || ''
          }
        }
      })

      return res.data
    },
    getCategoryTitleById (id, hasParent = false) {
      const item = this.$helpers.getItemById(this.allCategoriesList.items, id)

      return item && item.title
        ? hasParent
          ? `${this.getCategoryTitleById(item.parent_id)} - ${item.title}`
          : item.title
        : ''
    }
  }
}
