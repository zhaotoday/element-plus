<template>
  <div>
    <c-list
      :data="list.items"
      :columns="cList.columns"
      :total="list.total"
      :page-current="listPageCurrent"
      :search-where="listSearchWhere"
      @selection-change="handleListSelectionChange"
    >
    </c-list>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import ListMixin from "view-ui-admin/src/mixins/list";

const module = "incomes";
const initWhere = {
  schoolId: {
    $eq: ""
  },
  wxUserId: {
    $eq: ""
  }
};

@Component({
  mixins: [RouteParamsMixin, ListMixin]
})
export default class extends Vue {
  data() {
    const { ListColumnWidth } = this.$consts;

    return {
      list: {
        total: 0,
        items: []
      },
      cList: {
        columns: [
          {
            title: "校区",
            width: 180,
            render: (h, { row }) => h("span", row.school.name)
          },
          {
            title: "收入",
            render: (h, { row }) =>
              h("span", `${this.$helpers.formatNumber(row.valueSum)}元`)
          },
          {
            title: "手续费",
            render: (h, { row }) =>
              h("span", `${this.$helpers.formatNumber(row.serviceFeesSum)}元`)
          },
          {
            title: "佣金",
            render: (h, { row }) =>
              h("span", `${this.$helpers.formatNumber(row.commissionsSum)}元`)
          },
          {
            title: "时间",
            width: ListColumnWidth.CreatedAt,
            render: (h, { row }) => h("span", this.$time.getTime(row.createdAt))
          }
        ],
        cSearch: {
          where: this.$helpers.deepCopy(initWhere)
        }
      }
    };
  }

  async beforeRouteUpdate(to, from, next) {
    this.initListSearchWhere(initWhere);
    this.list = await this.getList();
    next();
  }

  async created() {
    this.initListSearchWhere(initWhere);
    this.list = await this.getList();
  }

  async getList() {
    const { data } = await this.$store.dispatch(`${module}/postAction`, {
      action: "getSchoolTotal",
      query: {
        offset: (this.listPageCurrent - 1) * this.$consts.PageSize,
        limit: this.$consts.PageSize,
        include: [
          {
            model: "School",
            as: "school"
          }
        ]
      }
    });
    return data;
  }
}
</script>
