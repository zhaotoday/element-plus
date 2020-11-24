import { Component, Mixins } from "vue-property-decorator";
import { mapState } from "vuex";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import ListMixin from "view-ui-admin/src/mixins/list";

const module = "withdraws";
const initWhere = {
  dateRange: {
    $eq: []
  },
  status: {
    $eq: ""
  },
  wxUserId: {
    $eq: ""
  }
};

@Component({
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
            width: 150,
            render: (h, { row }) => h("span", row.wxUser.nickName)
          },
          {
            title: "提现金额",
            render: (h, { row }) => h("span", `${row.value}元`)
          },
          {
            title: "申请时间",
            width: ListColumnWidth.CreatedAt,
            render: (h, { row }) => h("span", this.$time.getTime(row.createdAt))
          },
          {
            title: "状态",
            width: 80,
            render: (h, { row }) =>
              h(
                "span",
                null,
                this.$helpers.getItem(
                  this.dicts.WithdrawStatus,
                  "value",
                  row.status
                )["label"]
              )
          },
          {
            title: "操作",
            key: "action",
            width: 180,
            render: (h, { row }) =>
              h("div", [
                h("c-dropdown", {
                  props: {
                    width: 66,
                    title: "审核",
                    options: this.dicts.CheckAction,
                    disabled: !this.isPlatform() || row.status === "Paid"
                  },
                  on: {
                    click: action => {
                      this.$Modal.confirm({
                        title: "请确认",
                        content: `确认${
                          this.$helpers.getItem(
                            this.dicts.CheckStatus,
                            "value",
                            action
                          )["label"]
                        }？`,
                        onOk: () => {
                          this.changeStatus(row.id, action);
                        }
                      });
                    }
                  }
                }),
                h(
                  "c-confirm-button",
                  {
                    props: {
                      disabled: !this.isPlatform()
                    },
                    on: {
                      ok: () => {
                        this.confirmDelete(row.id);
                      }
                    }
                  },
                  "删除"
                )
              ])
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
    this.getList();
    next();
  }

  async created() {
    this.initListSearchWhere(initWhere);
    this.getList();
  }

  getList() {
    return this.$store.dispatch(`${module}/getList`, {
      query: {
        offset: (this.listPageCurrent - 1) * this.$consts.PageSize,
        limit: this.$consts.PageSize,
        where: this.listSearchWhere || initWhere,
        include: [
          {
            model: "WxUser",
            as: "wxUser"
          }
        ]
      }
    });
  }

  async confirmDelete(ids) {
    await this.$store.dispatch(`${module}/delete`, { id: ids });
    this.$Message.success("删除成功");

    const { items } = await this.getList();
    !items.length && this.goListPrevPage();
  }

  async changeStatus(id, action) {
    await this.$store.dispatch(`${module}/put`, {
      id,
      body: {
        status: this.$helpers.actionToStatus(this.dicts.WithdrawStatus, action)
      }
    });
    this.$Message.success(
      `${
        this.$helpers.getItem(this.dicts.CheckStatus, "value", action)["label"]
      }成功`
    );
    this.getList();
  }
}
