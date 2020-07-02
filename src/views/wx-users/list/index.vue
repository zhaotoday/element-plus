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

const module = "wxUsers";
const initWhere = {
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
            type: "selection",
            width: 60
          },
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
            title: "姓名",
            key: "name",
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
            title: "操作",
            key: "action",
            width: 90,
            render: (h, { row }) =>
              h("div", [
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
}
</script>
