import { Component, Mixins } from "vue-property-decorator";
import { mapState } from "vuex";
import CouponsListForm from "./form";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import ListMixin from "view-ui-admin/src/mixins/list";

const module = "coupons";
const initWhere = {
  status: {
    $eq: ""
  },
  name: {
    $like: ""
  }
};

@Component({
  components: {
    "c-coupons-list-form": CouponsListForm
  },
  computed: mapState({
    list: state => state[module].list
  })
})
export default class extends Mixins(RouteParamsMixin, ListMixin) {
  data() {
    return {
      cList: {
        columns: [
          {
            type: "selection",
            width: 60
          },
          {
            title: "名称",
            key: "name"
          },
          {
            title: "类型",
            width: 90,
            render: (h, { row }) =>
              h(
                "span",
                this.$helpers.getItem(this.dicts.CouponType, "value", row.type)[
                  "label"
                ]
              )
          },
          {
            title: "抵扣金额",
            width: 100,
            render: (h, { row }) => h("span", `${row.deductAmount}元`)
          },
          {
            title: "最低消费",
            width: 100,
            render: (h, { row }) => h("span", `${row.minConsumeAmount}元`)
          },
          {
            title: "有效期",
            width: 100,
            render: (h, params) => h("span", null, `${params.row.period}天`)
          },
          {
            title: "状态",
            width: 80,
            render: (h, { row }) =>
              h(
                "span",
                null,
                this.$helpers.getItem(
                  this.dicts.PublishStatus,
                  "value",
                  row.status
                )["label"]
              )
          },
          {
            title: "操作",
            key: "action",
            width: 266,
            render: (h, { row }) =>
              h("div", [
                h(
                  "Button",
                  {
                    on: {
                      click: () => {
                        this.$refs.form.show(row);
                      }
                    }
                  },
                  "编辑"
                ),
                h("c-dropdown", {
                  props: {
                    width: 90,
                    title: "修改状态",
                    options: this.dicts.PublishStatus
                  },
                  on: {
                    click: action => {
                      this.changeStatus(row.id, action);
                    }
                  }
                }),
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
        where: this.listSearchWhere || initWhere
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
        status: action
      }
    });
    this.$Message.success("修改状态成功");
    this.getList();
  }
}
