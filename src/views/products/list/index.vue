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
      <c-list-header>
        <c-list-operations>
          <Button type="primary" to="/products/products/list/form">
            新增
          </Button>
          <c-bulk-delete
            :selected-items="listSelectedItems"
            @ok="confirmDelete"
          >
          </c-bulk-delete>
        </c-list-operations>
        <c-list-search>
          <Form inline @submit.native.prevent="search">
            <Form-item prop="title">
              <Input
                placeholder="请输入标题"
                v-model="cList.cSearch.where.title.$like"
                style="width: 200px;"
              />
            </Form-item>
            <Form-item>
              <Button type="primary" @click="search">
                查询
              </Button>
            </Form-item>
          </Form>
        </c-list-search>
      </c-list-header>
    </c-list>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { mapState } from "vuex";
import RouteParamsMixin from "@/mixins/route-params";
import ListMixin from "@/mixins/list";
import AllCategoriesListMixin from "@/mixins/all-categories-list";

const module = "products";
const initWhere = {
  title: {
    $like: ""
  }
};

@Component({
  mixins: [RouteParamsMixin, ListMixin, AllCategoriesListMixin],
  computed: mapState({
    list: state => state[module].list
  })
})
export default class ProductsList extends Vue {
  data() {
    const { ListColumnWidth, OrderAction } = this.$consts;

    return {
      cList: {
        columns: [
          {
            type: "selection",
            width: 60
          },
          {
            title: "图片",
            width: 138,
            render: (h, { row }) => {
              return h("c-list-image", {
                props: {
                  src: this.$helpers.getFileUrlById(row.pictureId)
                }
              });
            }
          },
          {
            title: "名称",
            key: "name",
            minWidth: ListColumnWidth.Title
          },
          {
            title: "分类",
            width: ListColumnWidth.Category,
            render: (h, { row }) =>
              h("span", this.getCategoryNameById(row.categoryId, true))
          },
          {
            title: "价格",
            width: 80,
            render: (h, { row }) => h("span", row.originalPrice + "元")
          },
          {
            title: "会员价",
            width: 80,
            render: (h, { row }) => h("span", row.price + " 元")
          },
          {
            title: "库存",
            key: "stock",
            width: 80
          },
          {
            title: "标签",
            width: 100,
            render: (h, { row }) => {
              let tags = [];

              if (row.new) {
                tags.push("新品");
              }

              if (row.recommended) {
                tags.push("推荐");
              }

              return h("span", tags.join("; "));
            }
          },
          {
            title: "状态",
            width: 80,
            render: (h, { row }) =>
              h(
                "span",
                null,
                this.$helpers.getItem(
                  this.dicts.ProductStatus,
                  "value",
                  row.status
                )["label"]
              )
          },
          {
            title: "操作",
            key: "action",
            width: 340,
            render: (h, { row }) =>
              h("div", [
                h(
                  "Button",
                  {
                    props: {
                      to: `/${this.alias}/products/list/form/${row.id}`
                    }
                  },
                  "编辑"
                ),
                h(
                  "c-delete",
                  {
                    on: {
                      ok: () => {
                        this.confirmDelete(row.id);
                      }
                    }
                  },
                  "删除"
                ),
                h("c-dropdown", {
                  props: {
                    width: 90,
                    title: "修改状态",
                    options: this.dicts.ProductStatus
                  },
                  on: {
                    click: action => {
                      this.changeStatus(row.id, action);
                    }
                  }
                }),
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
        where: this.listSearchWhere
      }
    });
  }

  async confirmDelete(ids) {
    await this.$store.dispatch(`${module}/delete`, { id: ids });
    this.$Message.success("删除成功");

    const { items } = await this.getList();
    !items.length && this.goListPrevPage();
  }

  changeStatus(id, action) {
    console.log(id, action);
  }

  order(id, action) {
    console.log(id, action);
  }
}
</script>
