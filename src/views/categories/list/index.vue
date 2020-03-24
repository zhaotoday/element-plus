<template>
  <div class="p-categories">
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
          <Button type="primary" @click="showForm">
            新增
          </Button>
          <c-bulk-delete
            :selected-items="listSelectedItems"
            @ok="confirmDelete"
          ></c-bulk-delete>
          <Button v-if="isParent" @click="gotoParent">
            返回上一级
          </Button>
        </c-list-operations>
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
      <c-list-navigation v-if="levels !== 1">
        <Alert v-if="isParent">
          <b>{{ parentDetail.name }}</b> 的子分类：
        </Alert>
        <Alert v-else> <b>顶级分类</b> 的子分类 </Alert>
      </c-list-navigation>
    </c-list>
    <Modal
      width="496"
      v-model="cForm.modal"
      :title="cForm.id ? '编辑' : '新增'"
      :loading="cForm.loading"
      @on-ok="submit"
    >
      <Form
        ref="form"
        :model="cForm.model"
        :rules="cForm.rules"
        :label-width="80"
      >
        <Form-item v-if="levels !== 1" label="父类">
          <Row>
            <Col span="20">
              {{ isParent ? parentDetail.name : "顶级分类" }}
            </Col>
          </Row>
        </Form-item>
        <Form-item label="名称" prop="name">
          <Row>
            <Col span="20">
              <Input v-model="cForm.model.name" placeholder="请输入名称" />
            </Col>
          </Row>
        </Form-item>
        <Form-item label="图标" prop="icon">
          <c-uploader
            :has-default-file="!!cForm.model.icon"
            v-model="cForm.model.icon"
            @change="
              value => {
                handleFormUploaderChange('icon', value);
              }
            "
          />
        </Form-item>
        <Form-item label="Banner" prop="banner">
          <c-uploader
            :has-default-file="!!cForm.model.banner"
            v-model="cForm.model.banner"
            @change="
              value => {
                handleFormUploaderChange('banner', value);
              }
            "
          />
        </Form-item>
        <Form-item label="描述" prop="description">
          <Row>
            <Col span="20">
              <Input
                v-model="cForm.model.description"
                type="textarea"
                :rows="3"
                placeholder="请输入描述"
              />
            </Col>
          </Row>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { Vue, Component, Watch } from "vue-property-decorator";
import { mapState } from "vuex";
import RouteParamsMixin from "@/mixins/route-params";
import ListMixin from "@/mixins/list";
import FormMixin from "@/mixins/form";

const module = "categories";
const initWhere = {
  parentIds: [0],
  name: {
    $like: ""
  }
};

@Component({
  mixins: [RouteParamsMixin, ListMixin, FormMixin],
  computed: {
    ...mapState({
      list: state => state[module].list,
      parentDetail: state => state[module].detail
    }),
    levels() {
      return this.$consts.CATEGORY_LEVELS[this.$route.params.alias];
    },
    isParent() {
      const listSearchWhere = this.listSearchWhere;

      return (
        listSearchWhere &&
        listSearchWhere.parentIds &&
        listSearchWhere.parentIds[listSearchWhere.parentIds.length - 1] !== 0
      );
    }
  }
})
export default class CategoriesList extends Vue {
  data() {
    const { LIST_COLUMN_WIDTHS, ORDER_ACTIONS, CATEGORY_LEVELS } = this.$consts;

    const getLevels = () => {
      return CATEGORY_LEVELS[this.$route.params.alias];
    };

    return {
      parents: [],
      cList: {
        columns: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "图标",
            key: "icon",
            width: 120,
            render: (h, { row }) => {
              return row.icon
                ? h("img", {
                    attrs: {
                      src: this.$helpers.getFileURLById(row.iconId),
                      class: "pb-picture"
                    }
                  })
                : h("span", null, "无");
            }
          },
          {
            title: "名称",
            key: "name",
            minWidth: LIST_COLUMN_WIDTHS.TITLE
          },
          {
            title: "操作",
            key: "action",
            width: getLevels() === 1 ? 245 : 340,
            render: (h, { row }) =>
              h("div", [
                h(
                  "Button",
                  {
                    on: {
                      click: () => {
                        this.showForm(row);
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
                this.levels === 2
                  ? h(
                      "Button",
                      {
                        on: {
                          click: () => {
                            this.manageChild(row.id);
                          }
                        }
                      },
                      "管理子分类"
                    )
                  : null,
                h("c-dropdown", {
                  props: {
                    title: "排序",
                    options: ORDER_ACTIONS
                  },
                  on: {
                    click: async value => {
                      this.sort(row.id, value);
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
      cForm: {
        id: 0,
        modal: false,
        model: {},
        loading: true,
        rules: {
          name: [
            {
              required: true,
              message: "名称不能为空"
            }
          ]
        }
      }
    };
  }

  @Watch("cForm.modal")
  onFormModalChange(newVal) {
    !newVal && this.resetFormFields();
  }

  async beforeRouteUpdate(to, from, next) {
    this.initSearchWhere(initWhere);
    this.getList();
    this.getParentDetail();
    next();
  }

  async created() {
    this.$store.dispatch(`${module}/resetList`);
    this.initSearchWhere(initWhere);
    this.getList();
    this.getParentDetail();
  }

  getParentDetail() {
    if (this.listSearchWhere && this.listSearchWhere.parentIds) {
      const id = this.listSearchWhere.parentIds[
        this.listSearchWhere.parentIds.length - 1
      ];
      id && this.$store.dispatch(`${module}/getDetail`, { id });
    }
  }

  getList() {
    const { name, parentIds = [0] } = this.listSearchWhere || initWhere;

    return this.$store.dispatch(`${module}/getList`, {
      query: {
        offset: (this.listPageCurrent - 1) * this.$consts.PAGE_SIZE,
        limit: this.$consts.PAGE_SIZE,
        where: {
          parentId: parentIds[parentIds.length - 1],
          name
          // alias: this.alias
        }
      }
    });
  }

  async manageChild(id) {
    const parentIds =
      this.listSearchWhere && this.listSearchWhere.parentIds
        ? this.$helpers.deepCopy(this.listSearchWhere.parentIds)
        : [0];

    if (parentIds[parentIds.length - 1] !== id) {
      parentIds.push(id);
      this.$router.push({
        query: {
          listSearchWhere: JSON.stringify({
            ...initWhere,
            parentIds: parentIds
          })
        }
      });
    }
  }

  gotoParent() {
    const parentIds = this.$helpers.deepCopy(this.listSearchWhere.parentIds);

    parentIds.pop();

    this.$router.push({
      query: {
        listSearchWhere: JSON.stringify({ ...initWhere, parentIds })
      }
    });
  }

  showForm(detail) {
    this.cForm.modal = true;

    if (detail.id) {
      this.cForm.id = detail.id;
      this.initFormFields(detail);
    } else {
      this.cForm.id = 0;
    }
  }

  async confirmDelete(id) {
    await this.$store.dispatch(`${module}/delete`, { id });
    this.$Message.success("删除成功！");

    const getListRes = await this.getList();
    !getListRes.items.length && this.goPrevPage();
  }

  async sort(id, value) {
    const { name } = this.listSearchWhere || initWhere;

    await this.$store.dispatch(`${module}/postAction`, {
      query: {
        where: {
          parentId: this.isParent ? this.parentDetail.id : 0,
          name
          // alias: this.alias
        }
      },
      body: { type: value, id }
    });

    this.getList();
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        await this.$store.dispatch(
          this.cForm.id ? `${module}/put` : `${module}/post`,
          {
            id: this.cForm.id || "0",
            body: {
              ...this.cForm.model,
              // alias: this.alias,
              parentId: this.isParent ? this.parentDetail.id : undefined
            }
          }
        );

        this.cForm.modal = false;
        this.$Message.success((this.cForm.id ? "编辑" : "新增") + "成功！");
        !this.cForm.id &&
          this.resetSearch({
            ...initWhere,
            parentIds: this.isParent ? this.listSearchWhere.parentIds : [0]
          });
        this.getList();
      }

      this.fixFormButtonLoading("cForm");
    });
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
