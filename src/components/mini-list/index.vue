<template>
  <div>
    <c-list
      :show-page="false"
      :page-size="100"
      :data="filteredItems"
      :columns="cList.columns"
      @selection-change="handleListSelectionChange"
    >
      <c-list-header>
        <c-list-search>
          <Form class="c-form c-form--search" inline>
            <Form-item v-if="isProduct && isPlatform()" prop="schoolId">
              <c-school-select
                :value="cList.cSearch.schoolId"
                @change="
                  value => {
                    $set(cList.cSearch, 'schoolId', value);
                  }
                "
              >
              </c-school-select>
            </Form-item>
            <Form-item prop="keywords">
              <Input
                class="c-form__input"
                placeholder="请输入名称/标题"
                v-model="cList.cSearch.keywords"
              />
            </Form-item>
            <Form-item>
              <Button type="primary" @click="search">查询</Button>
            </Form-item>
          </Form>
        </c-list-search>
      </c-list-header>
    </c-list>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ListMixin from "view-ui-admin/src/mixins/list";

@Component({
  mixins: [ListMixin],
  props: {
    isProduct: {
      type: Boolean,
      default: false
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    selectable: {
      type: Boolean,
      default: false
    },
    multiSelect: {
      type: Boolean,
      default: true
    }
  }
})
export default class extends Vue {
  get filteredItems() {
    const getProductIfs = item =>
      (() => {
        if (this.isProduct && this.isPlatform()) {
          return item.schoolId === this.cList.cSearch.schoolId;
        } else {
          return true;
        }
      })();

    return this.items.filter(
      item =>
        !this.selectedItems
          .map(selectedItem => selectedItem.id)
          .includes(item.id) &&
        ((item.name || "").includes(this.cList.cSearch.keywords) ||
          (item.title || "").includes(this.cList.cSearch.keywords)) &&
        getProductIfs(item)
    );
  }

  created() {
    this.cList.cSearch.schoolId = this.getSchoolId();

    if (this.selectable && this.multiSelect) {
      this.cList.columns = [
        {
          type: "selection",
          width: 60
        },
        ...this.cList.columns
      ];
    }
  }

  data() {
    return {
      cList: {
        columns: [
          {
            title: "图片/图标",
            width: 118,
            render: (h, { row }) => {
              const pictureId = (() => {
                switch (true) {
                  case !!row.logoId:
                    return row.logoId;
                  case !!row.pictureId:
                    return row.pictureId;
                  case !!row.pictureIds:
                    return row.pictureIds[0];
                  default:
                    return "";
                }
              })();

              return row.iconCode
                ? h("c-icon", {
                    props: {
                      type: row.iconCode
                    }
                  })
                : pictureId
                ? h("c-list-image", {
                    props: {
                      src: this.$helpers.getImageUrl({
                        id: pictureId,
                        width: 80,
                        height: 80
                      })
                    }
                  })
                : h("span", "无");
            }
          },
          {
            title: "名称/标题",
            render: (h, { row }) => h("span", row.name || row.title)
          },
          {
            title: "操作",
            key: "action",
            width: 104,
            render: (h, { row }) =>
              h("div", [
                this.selectable
                  ? h(
                      "Button",
                      {
                        on: {
                          click: () => {
                            this.$emit("select", row);
                          }
                        }
                      },
                      "选择"
                    )
                  : h(
                      "Button",
                      {
                        on: {
                          click: () => {
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
          keywords: "",
          schoolId: ""
        }
      }
    };
  }

  async confirmDelete(ids) {
    ids
      .toString()
      .split(",")
      .forEach(id => {
        this.items.splice(
          this.items.findIndex(item => item.id === +id),
          1
        );
      });
  }

  handleListSelectionChange(selection) {
    this.listSelectedItems = selection;
  }
}
</script>
