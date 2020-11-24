import { Component, Mixins } from "vue-property-decorator";
import { mapState } from "vuex";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import ListMixin from "view-ui-admin/src/mixins/list";
import ListForm from "./form";

const module = "points";
const initWhere = {
  dateRange: {
    $eq: []
  },
  wxUserId: {
    $eq: ""
  }
};

@Component({
  components: {
    "c-list-form": ListForm
  },
  computed: mapState({
    list: state => state[module].list
  })
})
export default class extends Mixins(RouteParamsMixin, ListMixin) {
  data() {
    const { ListColumnWidth } = this.$consts;

    return {
      cList: {
        columns: [
          {
            type: "selection",
            width: 60
          },
          {
            title: "微信用户",
            render: (h, { row }) => h("span", row.wxUser.nickName)
          },
          {
            title: "积分",
            key: "value",
            width: 100
          },
          {
            title: "时间",
            width: ListColumnWidth.CreatedAt,
            render: (h, { row }) => h("span", this.$time.getTime(row.createdAt))
          },
          {
            title: "操作",
            key: "action",
            width: 104,
            render: (h, { row }) =>
              h("div", [
                h("c-confirm-button", {
                  props: {
                    buttonText: "删除",
                    confirmText: "确认删除？"
                  },
                  on: {
                    ok: () => {
                      this.confirmDelete(row.id);
                    }
                  }
                })
              ])
          }
        ],
        cSearch: {
          where: this.$helpers.deepCopy(initWhere)
        },
        total: 0
      }
    };
  }

  async beforeRouteUpdate(to, from, next) {
    this.initListSearchWhere(initWhere);
    await this.getListAndTotal();
    next();
  }

  async created() {
    this.initListSearchWhere(initWhere);
    await this.getListAndTotal();
  }

  async getListAndTotal() {
    this.getList();
    this.cList.total = await this.getTotal();
  }

  getList() {
    return this.$store.dispatch(`${module}/getList`, {
      query: {
        offset: (this.listPageCurrent - 1) * this.$consts.PageSize,
        limit: this.$consts.PageSize,
        where: this.listSearchWhere,
        include: [
          {
            model: "WxUser",
            as: "wxUser"
          }
        ]
      }
    });
  }

  async getTotal() {
    const { data } = await this.$store.dispatch(`${module}/postAction`, {
      action: "getTotal",
      query: {
        where: this.listSearchWhere
      }
    });
    return data;
  }

  async confirmDelete(ids) {
    await this.$store.dispatch(`${module}/delete`, { id: ids });
    this.$Message.success("删除成功");

    const { items } = await this.getList();
    !items.length && this.goListPrevPage();
  }
}
