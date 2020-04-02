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
                class="c-form__input"
                placeholder="请输入名称"
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
        class="c-form c-form--modal"
        ref="form"
        :model="cForm.model"
        :rules="cForm.rules"
        :label-width="80"
      >
        <Form-item v-if="levels !== 1" label="父类">
          {{ isParent ? parentDetail.name : "顶级分类" }}
        </Form-item>
        <Form-item label="名称" prop="name">
          <Input
            class="c-form__input"
            v-model.trim="cForm.model.name"
            placeholder="请输入名称"
          />
        </Form-item>
        <Form-item label="图标" prop="iconId">
          <c-uploader
            class="c-form__input"
            :key="cForm.id"
            :has-default-file="!!cForm.model.iconId"
            v-model="cForm.model.iconId"
            @change="
              value => {
                handleFormUploaderChange('iconId', value);
              }
            "
          />
        </Form-item>
        <Form-item label="Banner" prop="bannerId">
          <c-uploader
            class="c-form__input"
            :key="cForm.id"
            :has-default-file="!!cForm.model.bannerId"
            v-model="cForm.model.bannerId"
            @change="
              value => {
                handleFormUploaderChange('bannerId', value);
              }
            "
          />
        </Form-item>
        <Form-item label="描述" prop="description">
          <Input
            class="c-form__input"
            v-model.trim="cForm.model.description"
            type="textarea"
            :rows="3"
            placeholder="请输入描述"
          />
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
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
      return this.$consts.CategoryLevel[this.$route.params.alias];
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
    const { ListColumnWidth, OrderAction, CategoryLevel } = this.$consts;

    const getLevels = () => {
      return CategoryLevel[this.$route.params.alias];
    };

    return {
      parents: [],
      cList: {
        columns: [
          {
            type: "selection",
            width: 60
          },
          {
            title: "图标",
            width: 128,
            render: (h, { row }) => {
              return row.iconId
                ? h("c-list-image", {
                    props: {
                      src: this.$helpers.getFileUrlById(row.iconId)
                    }
                  })
                : h("span", "无");
            }
          },
          {
            title: "名称",
            key: "name",
            minWidth: ListColumnWidth.Title
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

  async beforeRouteUpdate(to, from, next) {
    this.initListSearchWhere(initWhere);
    this.getList();
    this.getParentDetail();
    next();
  }

  async created() {
    this.$store.dispatch(`${module}/resetList`);
    this.initListSearchWhere(initWhere);
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
        offset: (this.listPageCurrent - 1) * this.$consts.PageSize,
        limit: this.$consts.PageSize,
        where: {
          parentId: { $eq: parentIds[parentIds.length - 1] || null },
          name,
          alias: this.alias
        },
        order: [["order", "DESC"]]
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

    const { items } = await this.getList();
    !items.length && this.goListPrevPage();
  }

  async order(id, action) {
    const { name } = this.listSearchWhere || initWhere;

    await this.$store.dispatch(`${module}/postAction`, {
      id,
      action: "order",
      query: {
        where: {
          parentId: this.isParent ? this.parentDetail.id : 0,
          name,
          alias: this.alias
        }
      },
      body: { action }
    });

    this.$Message.success("排序成功");
    this.getList();
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const { id, model } = this.cForm;

        await this.$store.dispatch(`${module}/${id ? "put" : "post"}`, {
          id,
          body: {
            ...model,
            alias: this.alias,
            parentId: this.isParent ? this.parentDetail.id : undefined
          }
        });

        this.cForm.modal = false;
        this.$Message.success(`${id ? "编辑" : "新增"}成功`);
        !id &&
          this.resetListSearch({
            ...initWhere,
            parentIds: this.isParent ? this.listSearchWhere.parentIds : [0]
          });
        this.getList();
      }

      this.fixFormButtonLoading();
    });
  }
}
</script>
