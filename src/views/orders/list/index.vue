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
          <Button type="primary" @click="deliver">
            配送订单
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
            <Form-item prop="payment">
              <Select
                class="c-form__input"
                placeholder="请选择支付方式"
                clearable
                v-model="cList.cSearch.where.payment.$eq"
              >
                <Option
                  v-for="item in dicts.OrderPayment"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </Form-item>
            <Form-item prop="id">
              <Input
                class="c-form__input"
                placeholder="请输入订单号"
                v-model="cList.cSearch.where.no.$like"
              />
            </Form-item>
            <Form-item prop="wxUserId">
              <c-wx-user-select
                :value="cList.cSearch.where.wxUserId.$eq"
                @change="
                  value => {
                    $set(cList.cSearch.where.wxUserId.$eq, value);
                  }
                "
              >
              </c-wx-user-select>
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
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import RouteParamsMixin from "@/mixins/route-params";
import ListMixin from "@/mixins/list";

const module = "orders";
const initWhere = {
  no: {
    $like: ""
  },
  payment: {
    $eq: ""
  },
  status: {
    $eq: ""
  },
  wxUserId: {
    $eq: ""
  }
};

@Component({
  mixins: [RouteParamsMixin, ListMixin],
  computed: mapState({
    list: state => state[module].list
  })
})
export default class OrdersList extends Vue {
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
            title: "订单号",
            key: "no",
            width: 150
          },
          {
            title: "下单会员",
            width: ListColumnWidth.User,
            render: (h, { row }) => h("span", row.wxUser.nickName)
          },
          {
            title: "商品",
            render: (h, { row }) => h("span", JSON.stringify(row.products))
          },
          {
            title: "支付方式",
            width: 90,
            render: (h, { row }) =>
              h(
                "span",
                this.$helpers.getItem(
                  this.dicts.OrderPayment,
                  "value",
                  row.payment
                )["label"]
              )
          },
          {
            title: "支付金额",
            width: 90,
            render: (h, { row }) => h("span", row.amount + " 元")
          },
          {
            title: "下单时间",
            key: "createdAt",
            width: 140,
            render: (h, { row }) => h("span", this.$time.getTime(row.createdAt))
          },
          {
            title: "完成时间",
            width: 140,
            render: (h, { row }) =>
              h(
                "span",
                row.status === this.dicts.OrderStatus.Finished
                  ? this.$time.getTime(row.updatedAt)
                  : ""
              )
          },
          {
            title: "配送员",
            key: "delivererId",
            width: ListColumnWidth.User,
            render: (h, { row }) =>
              h("span", row.delivererUserId ? row.delivererUser.name : "")
          },
          {
            title: "状态",
            key: "status",
            width: 80,
            render: (h, { row }) =>
              h(
                "span",
                this.$helpers.getItem(
                  this.dicts.OrderStatus,
                  "value",
                  row.status
                )["label"]
              )
          },
          {
            title: "操作",
            key: "action",
            width: 255,
            render: (h, { row }) =>
              h("div", [
                h(
                  "Button",
                  {
                    on: {
                      click: () => {
                        this.showDetail(row);
                      }
                    }
                  },
                  "详情"
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

  deliver() {}
}
</script>
