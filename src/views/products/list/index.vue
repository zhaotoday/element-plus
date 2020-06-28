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
          <Form
            class="c-form c-form--search"
            inline
            @submit.native.prevent="search"
          >
            <Form-item prop="status">
              <Select
                class="c-form__input"
                placeholder="请选择状态"
                clearable
                v-model="cList.cSearch.where.status.$eq"
              >
                <Option
                  v-for="item in dicts.PublishStatus"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </Form-item>
            <Form-item prop="categoryId">
              <c-category-select
                class="c-form__input"
                select-parent
                :alias="alias"
                v-model="cList.cSearch.where.categoryId.$eq"
                @change="
                  value => {
                    cList.cSearch.where.categoryId.$eq = value;
                  }
                "
              ></c-category-select>
            </Form-item>
            <Form-item prop="type">
              <Select
                class="c-form__input"
                placeholder="请选择类型"
                clearable
                v-model="cList.cSearch.where.type.$eq"
              >
                <Option
                  v-for="item in dicts.ProductType"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </Form-item>
            <Form-item prop="name">
              <Input
                class="c-form__input"
                placeholder="请输入名称"
                v-model="cList.cSearch.where.name.$like"
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
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import RouteParamsMixin from 'view-ui-admin/src/mixins/route-params'
import ListMixin from 'view-ui-admin/src/mixins/list'
import AllCategoriesListMixin from 'view-ui-admin/src/mixins/all-categories-list'

const module = "products";

const initWhere = {
  name: {
    $like: ""
  },
  categoryId: {
    $eq: ""
  },
  type: {
    $eq: ""
  },
  status: {
    $eq: ""
  }
};

@Component({
  mixins: [RouteParamsMixin, ListMixin, AllCategoriesListMixin],
  computed: mapState({
    list: state => state[module].list
  })
})
export default class extends Vue {
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
            width: 118,
            render: (h, { row }) => {
              return h("c-list-image", {
                props: {
                  src: this.$helpers.getImageUrl({
                    id: row.pictureIds[0],
                    width: 80,
                    height: 80
                  })
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
            width: 100,
            render: (h, { row }) =>
              h("span", this.getCategoryNameById(row.categoryId, false))
          },
          {
            title: "类型",
            width: 80,
            render: (h, { row }) =>
              h(
                "span",
                this.$helpers.getItem(
                  this.dicts.ProductType,
                  "value",
                  row.type
                )["label"]
              )
          },
          {
            title: "会员价",
            width: 80,
            render: (h, { row }) => h("span", row.price + "元")
          },
          {
            title: "积分",
            key: "points",
            width: 80
          },
          {
            title: "佣金比例",
            width: 90,
            render: (h, { row }) => h("span", row.commissionRate + "%")
          },
          {
            title: "库存",
            key: "stock",
            width: 80
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
                // h(
                //   "Button",
                //   {
                //     on: {
                //       click: () => {
                //         this.$router.push({
                //           path: "/reports/orders/list",
                //           query: {
                //             listSearchWhere: JSON.stringify({
                //               productId: 0
                //             })
                //           }
                //         });
                //       }
                //     }
                //   },
                //   "订单"
                // ),
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
        order: [["order", "DESC"]]
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

  async order(id, action) {
    await this.$store.dispatch(`${module}/postAction`, {
      id,
      action: "order",
      query: {
        where: this.listSearchWhere || initWhere
      },
      body: { action }
    });

    this.$Message.success("排序成功");
    this.getList();
  }
}
</script>
