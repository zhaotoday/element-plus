import { Vue, Component } from "vue-property-decorator";

@Component
export default class ListMixin extends Vue {
  listSelectedItems = [];
  listPageCurrent = 1;
  listSearchWhere = {};

  async beforeRouteUpdate(to, from, next) {
    const { query } = to;

    this.listPageCurrent = +query.listPageCurrent || 1;
    this.listSearchWhere = query.listSearchWhere
      ? JSON.parse(query.listSearchWhere)
      : null;

    next();
  }

  async created() {
    const { query } = this.$route;

    this.listPageCurrent = +query.listPageCurrent || 1;
    this.listSearchWhere = query.listSearchWhere
      ? JSON.parse(query.listSearchWhere)
      : null;
  }

  handleListSelectionChange(selection) {
    this.listSelectedItems = selection;
  }

  initListSearchWhere(initWhere) {
    this.cList.cSearch.where = this.listSearchWhere
      ? this.$helpers.deepCopy(this.listSearchWhere)
      : this.$helpers.deepCopy(initWhere);
  }

  async resetList(initWhere) {
    this.$router.push({
      query: Object.assign(
        {
          listPageCurrent: 1
        },
        initWhere
          ? {
              listSearchWhere: JSON.stringify(initWhere)
            }
          : null
      )
    });
  }

  async resetListSearch(initWhere) {
    this.$router.push({
      query: {
        listPageCurrent: 1,
        listSearchWhere: JSON.stringify(initWhere)
      }
    });
  }

  search() {
    this.$router.push({
      query: {
        listPageCurrent: 1,
        listSearchWhere: JSON.stringify(this.cList.cSearch.where)
      }
    });
  }

  goListPrevPage() {
    if (this.listPageCurrent !== 1) {
      this.$router.push({
        query: {
          listPageCurrent: this.listPageCurrent - 1 || 1,
          listSearchWhere: JSON.stringify(this.listSearchWhere)
        }
      });
    }
  }
}
