<template>
  <div class="p-ads-list">
    <c-list
      :data="list.items"
      :columns="cList.columns"
      :total="list.total"
      :page-current="listPageCurrent"
      :search-where="listSearchWhere"
    >
      <c-list-header>
        <c-list-operations>
          <Button type="primary" @click="$refs.form.show()">
            新增
          </Button>
        </c-list-operations>
        <c-list-search>
          <Form inline @submit.native.prevent="search">
            <Form-item prop="title">
              <Input
                type="text"
                placeholder="请输入标题"
                v-model="cList.cSearch.where.title.$like"
                style="width: 190px;"
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
    <c-ads-list-form ref="form" @get-list="getList"></c-ads-list-form>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { mapState } from "vuex";
import AdsListForm from "./form";
import RouteParamsMixin from "@/mixins/route-params";
import ListMixin from "@/mixins/list";

const module = "ads";
const initWhere = {
  title: {
    $like: ""
  }
};

@Component({
  mixins: [RouteParamsMixin, ListMixin],
  components: {
    "c-ads-list-form": AdsListForm
  },
  computed: mapState({
    list: state => state[module].list
  })
})
export default class AdsList extends Vue {
  data() {
    const { ListColumnWidth, SortAction } = this.$consts;

    return {
      cList: {
        columns: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "图片",
            width: 200,
            render: (h, { row }) => {
              return h("Avatar", {
                attrs: {
                  src: this.$helpers.getFileUrlById(row.picture),
                  size: "large"
                }
              });
            }
          },
          {
            title: "标题",
            key: "title",
            minWidth: ListColumnWidth.Title
          },
          {
            title: "链接",
            key: "link",
            width: 300
          },
          {
            title: "操作",
            key: "action",
            width: 245,
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
                  attrs: {
                    title: "排序",
                    options: SortAction
                  },
                  on: {
                    click: async value => {
                      this.handleOrder(row.id, value);
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
      cAttachments: {
        modal: false
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

  async confirmDelete(id) {
    await this.$store.dispatch(`${module}/delete`, { id });
    this.$Message.success("删除成功");

    const getListRes = await this.getList();
    !getListRes.items.length && this.goListPrevPage();
  }
}
</script>
