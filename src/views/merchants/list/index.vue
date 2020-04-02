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
          <Button type="primary" @click="$refs.form.show()">
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
            <Form-item prop="status">
              <c-publish-status-select
                class="c-form__input"
                :value="cList.cSearch.where.status.$eq"
                @change="
                  value => {
                    cList.cSearch.where.status.$eq = value;
                  }
                "
              ></c-publish-status-select>
            </Form-item>
            <Form-item prop="name">
              <Input
                placeholder="请输入名称"
                v-model="cList.cSearch.where.name.$like"
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
    <c-merchants-list-form
      ref="form"
      @get-list="getList"
    ></c-merchants-list-form>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { mapState } from "vuex";
import MerchantsListForm from "./form";
import RouteParamsMixin from "@/mixins/route-params";
import ListMixin from "@/mixins/list";

const module = "merchants";
const initWhere = {
  status: {
    $eq: ""
  },
  name: {
    $like: ""
  }
};

@Component({
  mixins: [RouteParamsMixin, ListMixin],
  components: {
    "c-merchants-list-form": MerchantsListForm
  },
  computed: mapState({
    list: state => state[module].list
  })
})
export default class MerchantsList extends Vue {
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
            title: "关联的微信用户",
            width: 130,
            render: (h, { row }) => h("span", row.wxUser.nickName)
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
                    on: {
                      click: () => {
                        this.$refs.form.show(row);
                      }
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
                  attrs: {
                    title: "排序",
                    options: OrderAction
                  },
                  on: {
                    click: action => {
                      this.order(row.id, action);
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
