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
          <Button @click="$helpers.goBack()">
            返回
          </Button>
        </c-list-operations>
        <c-list-search>
          <Form inline @submit.native.prevent="search">
            <Form-item prop="status">
              <c-check-status-select
                class="c-form__input"
                :value="cList.cSearch.where.status.$eq"
                @change="
                  value => {
                    cList.cSearch.where.status.$eq = value;
                  }
                "
              ></c-check-status-select>
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

const module = "comments";
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
export default class CommentsList extends Vue {
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
            title: "评价会员",
            width: ListColumnWidth.User,
            render: (h, { row }) => h("span", row.wxUser.nickName)
          },
          {
            title: "评价内容",
            key: "content"
          },
          {
            title: "审核状态",
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
            width: 180,
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
                      this.changeStatus(row.id, action);
                    }
                  }
                }),
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
        where: {
          ...this.listSearchWhere,
          productId: this.$route.params.productId
        },
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
</script>
