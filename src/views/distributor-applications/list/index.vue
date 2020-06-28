<template>
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
        <c-bulk-delete :selected-items="listSelectedItems" @ok="confirmDelete">
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
                v-for="item in dicts.CheckStatus"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              >
                {{ item.label }}
              </Option>
            </Select>
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
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import ListMixin from "view-ui-admin/src/mixins/list";

const module = "distributorApplications";
const initWhere = {
  status: {
    $eq: ""
  }
};

@Component({
  mixins: [RouteParamsMixin, ListMixin],
  computed: mapState({
    list: state => state[module].list
  })
})
export default class extends Vue {
  data() {
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
                  src: row.wxUser.avatarUrl
                }
              });
            }
          },
          {
            title: "昵称",
            render: (h, { row }) => h("span", row.wxUser.nickName)
          },
          {
            title: "姓名",
            width: 150,
            render: (h, { row }) => h("span", row.wxUser.name)
          },
          {
            title: "手机号",
            width: 150,
            render: (h, { row }) => h("span", row.wxUser.phoneNumber)
          },
          {
            title: "状态",
            width: 100,
            render: (h, { row }) =>
              h(
                "span",
                null,
                this.$helpers.getItem(
                  this.dicts.CheckStatus,
                  "value",
                  row.status
                )["label"]
              )
          },
          {
            title: "操作",
            key: "action",
            width: 178,
            render: (h, { row }) =>
              h("div", [
                h("c-dropdown", {
                  props: {
                    width: 66,
                    title: "审核",
                    options: this.dicts.CheckStatus
                  },
                  on: {
                    click: action => {
                      this.changeStatus(row.wxUserId, action);
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

  async changeStatus(wxUserId, action) {
    await this.$store.dispatch(`${module}/postAction`, {
      action: "changeStatus",
      body: { wxUserId, status: action }
    });
    this.$Message.success("修改状态成功");
    this.getList();
  }
}
</script>
