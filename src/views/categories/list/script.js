import { Component, Mixins } from "vue-property-decorator";
import { mapState } from "vuex";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import ListMixin from "view-ui-admin/src/mixins/list";
import FormMixin from "view-ui-admin/src/mixins/form";

const module = "categories";
const initWhere = {
  parentIds: [0],
  name: {
    $like: ""
  }
};

@Component({
  computed: {
    ...mapState({
      list: state => state[module].list,
      parentDetail: state => state[module].detail
    }),
    levels() {
      return this.$consts.CategoryLevel[this.$route.params.alias];
    },
    isParent() {
      const listSearchWhere = this.listSearchWhere;

      return (
        listSearchWhere &&
        listSearchWhere.parentIds &&
        listSearchWhere.parentIds[listSearchWhere.parentIds.length - 1] !== 0
      );
    }
  }
})
export default class extends Mixins(RouteParamsMixin, ListMixin, FormMixin) {
  data() {
    const { ListColumnWidth, OrderAction, CategoryLevel } = this.$consts;

    const getLevels = () => {
      return CategoryLevel[this.$route.params.alias];
    };

    return {
      parents: [],
      cList: {
        columns: [
          {
            type: "selection",
            width: 60
          },
          {
            title: "图标",
            width: 118,
            render: (h, { row }) => {
              return row.iconId
                ? h("c-list-image", {
                    props: {
                      src: this.$helpers.getImageUrl({
                        id: row.iconId,
                        width: 80,
                        height: 80
                      })
                    }
                  })
                : h("span", "无");
            }
          },
          {
            title: "名称",
            key: "name",
            minWidth: ListColumnWidth.Title
          },
          {
            title: "操作",
            key: "action",
            width: getLevels() === 1 ? 245 : 340,
            render: (h, { row }) =>
              h("div", [
                h(
                  "Button",
                  {
                    on: {
                      click: () => {
                        this.showForm(row);
                      }
                    }
                  },
                  "编辑"
                ),
                this.levels === 2
                  ? h(
                      "Button",
                      {
                        on: {
                          click: () => {
                            this.manageChild(row.id);
                          }
                        }
                      },
                      "管理子分类"
                    )
                  : null,
                h("c-dropdown", {
                  props: {
                    title: "排序",
                    options: OrderAction
                  },
                  on: {
                    click: action => {
                      this.order(row.id, action);
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
      },
      cForm: {
        id: 0,
        modal: false,
        model: {},
        loading: true,
        rules: {
          name: [
            {
              required: true,
              message: "名称不能为空"
            }
          ]
        }
      }
    };
  }

  async beforeRouteUpdate(to, from, next) {
    this.initListSearchWhere(initWhere);
    this.getList();
    this.getParentDetail();
    next();
  }

  async created() {
    this.$store.dispatch(`${module}/resetList`);
    this.initListSearchWhere(initWhere);
    this.getList();
    this.getParentDetail();
  }

  getParentDetail() {
    if (this.listSearchWhere && this.listSearchWhere.parentIds) {
      const id = this.listSearchWhere.parentIds[
        this.listSearchWhere.parentIds.length - 1
      ];
      id && this.$store.dispatch(`${module}/getDetail`, { id });
    }
  }

  getList() {
    const { name, parentIds = [0] } = this.listSearchWhere || initWhere;

    return this.$store.dispatch(`${module}/getList`, {
      query: {
        offset: (this.listPageCurrent - 1) * this.$consts.PageSize,
        limit: this.$consts.PageSize,
        where: {
          parentId: { $eq: parentIds[parentIds.length - 1] || null },
          name,
          alias: this.alias
        },
        order: [["order", "DESC"]]
      }
    });
  }

  async manageChild(id) {
    const parentIds =
      this.listSearchWhere && this.listSearchWhere.parentIds
        ? this.$helpers.deepCopy(this.listSearchWhere.parentIds)
        : [0];

    if (parentIds[parentIds.length - 1] !== id) {
      parentIds.push(id);
      this.$router.push({
        query: {
          listSearchWhere: JSON.stringify({
            ...initWhere,
            parentIds: parentIds
          })
        }
      });
    }
  }

  gotoParent() {
    const parentIds = this.$helpers.deepCopy(this.listSearchWhere.parentIds);

    parentIds.pop();

    this.$router.push({
      query: {
        listSearchWhere: JSON.stringify({ ...initWhere, parentIds })
      }
    });
  }

  showForm(detail) {
    this.cForm.modal = true;

    if (detail.id) {
      this.cForm.id = detail.id;
      this.initFormFields(detail);
    } else {
      this.cForm.id = 0;
    }
  }

  async confirmDelete(id) {
    await this.$store.dispatch(`${module}/delete`, { id });
    this.$Message.success("删除成功！");

    const { items } = await this.getList();
    !items.length && this.goListPrevPage();
  }

  async order(id, action) {
    const { name } = this.listSearchWhere || initWhere;

    await this.$store.dispatch(`${module}/postAction`, {
      id,
      action: "order",
      query: {
        where: {
          parentId: this.isParent ? this.parentDetail.id : 0,
          name,
          alias: this.alias
        }
      },
      body: { action }
    });

    this.$Message.success("排序成功");
    this.getList();
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const { id, model } = this.cForm;

        await this.$store.dispatch(`${module}/${id ? "put" : "post"}`, {
          id,
          body: {
            ...model,
            alias: this.alias,
            parentId: this.isParent ? this.parentDetail.id : undefined
          }
        });

        this.cForm.modal = false;
        this.$Message.success(`${id ? "编辑" : "新增"}成功`);
        !id &&
          this.resetListSearch({
            ...initWhere,
            parentIds: this.isParent ? this.listSearchWhere.parentIds : [0]
          });
        this.getList();
      }

      this.fixFormButtonLoading();
    });
  }
}
