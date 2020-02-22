import Model from "@/models/admin/categories";

export default {
  data() {
    return {
      allCategoriesList: {}
    };
  },
  async created() {
    this.allCategoriesList = await this.getAllCategoriesList();
  },
  methods: {
    async getAllCategoriesList() {
      const { data } = await new Model().GET({
        query: {
          offset: 0,
          limit: 1000,
          where: {
            // alias: this.alias || ''
          }
        }
      });

      return data;
    },
    getCategoryTitleById(id, hasParent = false) {
      const item = this.$helpers.getItemById(this.allCategoriesList.items, id);

      return item && item.name
        ? hasParent
          ? `${this.getCategoryTitleById(item.parentId)} - ${item.name}`
          : item.name
        : "";
    }
  }
};
