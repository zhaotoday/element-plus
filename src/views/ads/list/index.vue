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
        <c-list-search>
          <Form inline @submit.native.prevent="search">
            <Form-item prop="name">
              <Input
                type="text"
                placeholder="请输入名称"
                v-model="cList.cSearch.where.name.$like"
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
    <c-projects-list-form ref="form" @get-list="getList"></c-projects-list-form>
    <Modal width="496" v-model="cAttachments.modal" title="附件">
      <div style="height: 500px; overflow-x: hidden; overflow-y: auto;">
        <c-attachments ref="attachments"></c-attachments>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { mapState } from "vuex";
import ProjectsListForm from "./components/form";
import RouteParamsMixin from "@/mixins/route-params";
import ListMixin from "@/mixins/list";

const module = "projects";
const initWhere = {
  name: {
    $like: ""
  }
};

@Component({
  mixins: [RouteParamsMixin, ListMixin],
  components: {
    "c-projects-list-form": ProjectsListForm
  },
  computed: mapState({
    list: state => state[module].list
  })
})
export default class AdsList extends Vue {
  data() {
    return {
      cList: {
        columns: [
          {
            title: "ID",
            key: "id",
            width: 70
          },
          {
            title: "名称",
            key: "name"
          },
          {
            title: "业主单位",
            key: "ownerUnit",
            width: 300
          },
          {
            title: "项目经理",
            width: 150,
            render: (h, { row }) =>
              h("c-user-info", {
                props: {
                  key: `${row.id}-${row.userId}`,
                  pk: row.userId
                }
              })
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
                    on: {
                      click: () => {
                        this.$refs.form.show(row);
                      }
                    }
                  },
                  "立项信息"
                ),
                h(
                  "Button",
                  {
                    on: {
                      click: () => {
                        this.showForm(row);
                      }
                    }
                  },
                  "子项信息"
                ),
                h(
                  "Button",
                  {
                    on: {
                      click: () => {
                        this.$refs.attachments.init(row.id);
                        this.cAttachments.modal = true;
                      }
                    }
                  },
                  "附件"
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
        offset: (this.listPageCurrent - 1) * this.$consts.PAGE_SIZE,
        limit: this.$consts.PAGE_SIZE,
        where: {
          ...this.listSearchWhere,
          isParent: { $eq: 1 }
        }
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
