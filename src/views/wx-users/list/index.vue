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
            <Form-item prop="nickName">
              <Input
                class="c-form__input"
                placeholder="请输入昵称"
                v-model.trim="cList.cSearch.where.nickName.$like"
              />
            </Form-item>
            <Form-item prop="name">
              <Input
                class="c-form__input"
                placeholder="请输入姓名"
                v-model.trim="cList.cSearch.where.name.$like"
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
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import ListMixin from "view-ui-admin/src/mixins/list";
import xlsx from "view-ui-admin/src/utils/xlsx";
import WxUsersModel from "@/models/admin/wx-users";

const module = "wxUsers";
const initWhere = {
  type: {
    $eq: ""
  },
  nickName: {
    $like: ""
  },
  name: {
    $like: ""
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
    const { ListColumnWidth } = this.$consts;

    return {
      cList: {
        columns: [
          {
            title: "图片",
            width: 118,
            render: (h, { row }) => {
              return h("c-list-image", {
                props: {
                  src: row.avatarUrl
                }
              });
            }
          },
          {
            title: "昵称",
            key: "nickName",
            minWidth: ListColumnWidth.User
          },
          {
            title: "手机号",
            key: "phoneNumber",
            width: 150
          },
          {
            title: "性别",
            key: "gender",
            width: 65,
            render: (h, { row }) =>
              h(
                "span",
                this.$helpers.getItem(this.dicts.Gender, "value", row.gender)[
                  "label"
                ]
              )
          },
          {
            title: "省份",
            key: "province",
            width: 100
          },
          {
            title: "城市",
            key: "city",
            width: 100
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
            width: 166,
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

  async getExportWxUsersListItems() {
    this.search();

    const {
      data: { items }
    } = await new WxUsersModel().GET({
      query: { where: this.listSearchWhere }
    });

    return items;
  }

  async exportXLSX() {
    const items = await this.getExportWxUsersListItems();

    xlsx.download({
      fileName: `微信用户（${this.$time.getDate()}）`,
      data: (() => {
        const columns = this.cList.columns;
        const columnKeys = this.cList.columns.map(item => item.key);

        return items.map(item => {
          let ret = {};

          Object.keys(item).forEach(key => {
            const index = columnKeys.findIndex(columnKey => columnKey === key);

            if (index !== -1) {
              switch (key) {
                case "gender":
                  ret[columns[index].title] = this.$helpers.getItem(
                    this.dicts.Gender,
                    "value",
                    item[key]
                  );
                  break;
                default:
                  ret[columns[index].title] = item[key];
                  break;
              }
            }
          });

          return ret;
        });
      })()
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
}
</script>
