<template>
  <div>
    <c-list
      :data="list.items"
      :columns="cList.columns"
      :total="list.total"
      :page-current="listPageCurrent"
      :search-where="listSearchWhere"
    >
      <c-list-header>
        <c-list-search>
          <Form
            class="c-form c-form--search"
            inline
            @submit.native.prevent="search"
          >
            <Form-item prop="type">
              <Select
                class="c-form__input"
                placeholder="请选择用户类型"
                clearable
                v-model="cList.cSearch.where.type.$eq"
              >
                <Option
                  v-for="item in dicts.WxUserType"
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
    <c-lower-wx-users ref="lowerWxUsers"></c-lower-wx-users>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import ListMixin from "view-ui-admin/src/mixins/list";
import LowerWxUsers from "./lower-wx-users";

const module = "schoolWxUsers";
const initWhere = {
  type: {
    $eq: ""
  }
};

@Component({
  components: {
    "c-lower-wx-users": LowerWxUsers
  },
  mixins: [RouteParamsMixin, ListMixin],
  computed: mapState({
    list: state => state[module].list
  })
})
export default class extends Vue {
  data() {
    const { ListColumnWidth } = this.$consts;

    return {
      cList: {
        columns: [
          {
            title: "头像",
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
            minWidth: ListColumnWidth.User,
            render: (h, { row }) => h("span", row.wxUser.nickName)
          },
          {
            title: "手机号",
            width: 150,
            render: (h, { row }) => h("span", row.wxUser.phoneNumber)
          },
          {
            title: "性别",
            key: "gender",
            width: 65,
            render: (h, { row }) =>
              h(
                "span",
                this.$helpers.getItem(
                  this.dicts.Gender,
                  "value",
                  row.wxUser.gender
                )["label"]
              )
          },
          {
            title: "省份",
            width: 100,
            render: (h, { row }) => h("span", row.wxUser.province)
          },
          {
            title: "城市",
            width: 100,
            render: (h, { row }) => h("span", row.wxUser.city)
          },
          {
            title: "分销上级",
            width: 150,
            render: (h, { row }) =>
              h("span", row.upperWxUser ? row.upperWxUser.nickName : "")
          },
          {
            title: "用户类型",
            width: 100,
            render: (h, { row }) =>
              h(
                "span",
                null,
                this.$helpers.getItem(this.dicts.WxUserType, "value", row.type)[
                  "label"
                ]
              )
          },
          {
            title: "操作",
            key: "action",
            width: 386,
            render: (h, { row }) =>
              h("div", [
                h("c-dropdown", {
                  props: {
                    width: 114,
                    title: "修改用户类型",
                    options: this.dicts.WxUserType
                  },
                  on: {
                    click: type => {
                      this.changeWxUserType(row.id, type);
                    }
                  }
                }),
                h(
                  "Button",
                  {
                    on: {
                      click: () => {
                        this.$refs.lowerWxUsers.show(row.wxUserId);
                      }
                    }
                  },
                  "查看分销下级"
                ),
                h("c-confirm-button", {
                  props: {
                    "button-text": "删除分销上级",
                    "confirm-text": "确认删除？"
                  },
                  on: {
                    ok: () => {
                      this.deleteUpperWxUserId(row.id);
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
        where: this.listSearchWhere,
        include: [
          { model: "WxUser", as: "wxUser" },
          { model: "WxUser", as: "upperWxUser" }
        ]
      }
    });
  }

  async changeWxUserType(id, type) {
    await this.$store.dispatch(`${module}/put`, {
      id,
      body: { type }
    });
    this.$Message.success("修改用户类型成功");
    this.getList();
  }

  async deleteUpperWxUserId(id) {
    await this.$store.dispatch(`${module}/put`, {
      id,
      body: { upperWxUserId: null }
    });
    this.$Message.success("删除成功");
    this.getList();
  }
}
</script>
