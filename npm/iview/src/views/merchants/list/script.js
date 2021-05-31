import { Component, Mixins } from "vue-property-decorator";
import { mapState } from "vuex";
import MerchantsListForm from "./form";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import ListMixin from "view-ui-admin/src/mixins/list";

const module = "merchants";
const initWhere = {
  name: {
    $like: ""
  }
};

@Component({
  components: {
    "c-merchants-list-form": MerchantsListForm
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
            title: "名称",
            key: "name",
            minWidth: ListColumnWidth.Title
          },
          {
            title: "关联的微信用户",
            width: 130,
            render: (h, { row }) =>
              h("span", row.wxUser ? row.wxUser.nickName : "")
          },
          {
            title: "联系人",
            key: "contactName",
            width: 100
          },
          {
            title: "手机号",
            key: "phoneNumber",
            width: 120
          },
          {
            title: "操作",
            key: "action",
            width: 170,
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
        where: this.listSearchWhere || initWhere,
        include: [{ model: "WxUser", as: "wxUser" }]
      }
    });
  }

  async confirmDelete(ids) {
    await this.$store.dispatch(`${module}/delete`, { id: ids });
    this.$Message.success("删除成功");

    const { items } = await this.getList();
    !items.length && this.goListPrevPage();
  }
}
