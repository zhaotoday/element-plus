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
          <Button
            v-if="userType === 'School'"
            type="primary"
            @click="$refs.form.show()"
          >
            申请提现
          </Button>
        </c-list-operations>
        <c-list-search>
          <Form
            class="c-form c-form--search"
            inline
            @submit.native.prevent="search"
          >
            <Form-item prop="schoolId">
              <c-school-select
                :value="cList.cSearch.where.schoolId.$eq"
                @change="
                  value => {
                    cList.cSearch.where.schoolId.$eq = value;
                  }
                "
              >
              </c-school-select>
            </Form-item>
            <Form-item prop="dateRange">
              <c-date-range
                class="c-form__input"
                :value="cList.cSearch.where.dateRange.$eq"
                @change="
                  date => {
                    cList.cSearch.where.dateRange.$eq = date;
                  }
                "
              ></c-date-range>
            </Form-item>
            <Form-item prop="status">
              <Select
                class="c-form__input"
                placeholder="请选择状态"
                clearable
                v-model="cList.cSearch.where.status.$eq"
              >
                <Option
                  v-for="item in dicts.WithdrawStatus"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </Form-item>
            <Form-item prop="wxUserId">
              <c-school-wx-user-select
                :school-id="getSchoolId()"
                :value="cList.cSearch.where.wxUserId.$eq"
                @change="
                  value => {
                    this.cList.cSearch.where.wxUserId.$eq = value;
                  }
                "
              >
              </c-school-wx-user-select>
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
    <c-list-form ref="form" @get-list="getList"></c-list-form>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import ListMixin from "view-ui-admin/src/mixins/list";
import ListForm from "./form";

const module = "withdraws";
const initWhere = {
  dateRange: {
    $eq: []
  },
  status: {
    $eq: ""
  },
  schoolId: {
    $eq: 1
  },
  wxUserId: {
    $eq: ""
  }
};

@Component({
  components: {
    "c-list-form": ListForm
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
      userType: "",
      cList: {
        columns: [
          {
            type: "selection",
            width: 60
          },
          {
            title: "校区",
            width: 180,
            render: (h, { row }) => h("span", row.school.name)
          },
          {
            title: "微信用户",
            width: 150,
            render: (h, { row }) => h("span", row.wxUser.nickName)
          },
          {
            title: "提现金额",
            render: (h, { row }) => h("span", `${row.value}元`)
          },
          {
            title: "申请时间",
            width: ListColumnWidth.CreatedAt,
            render: (h, { row }) => h("span", this.$time.getTime(row.createdAt))
          },
          {
            title: "状态",
            width: 80,
            render: (h, { row }) =>
              h(
                "span",
                null,
                this.$helpers.getItem(
                  this.dicts.WithdrawStatus,
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
                    options: this.dicts.CheckAction,
                    disabled: !this.isPlatform() || row.status === "Paid"
                  },
                  on: {
                    click: action => {
                      this.$Modal.confirm({
                        title: "请确认",
                        content: `确认${
                          this.$helpers.getItem(
                            this.dicts.CheckStatus,
                            "value",
                            action
                          )["label"]
                        }？`,
                        onOk: () => {
                          this.changeStatus(row.id, action);
                        }
                      });
                    }
                  }
                }),
                h(
                  "c-confirm-button",
                  {
                    props: {
                      disabled: !this.isPlatform()
                    },
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
    this.userType = to.params.userType;
    this.initListSearchWhere(initWhere);
    this.getList();
    next();
  }

  async created() {
    this.userType = this.$route.params.userType;
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
          userType: { $eq: this.userType }
        },
        include: [
          {
            model: "School",
            as: "school"
          },
          {
            model: "WxUser",
            as: "wxUser"
          }
        ]
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
        status: this.$helpers.actionToStatus(this.dicts.WithdrawStatus, action)
      }
    });
    this.$Message.success(
      `${
        this.$helpers.getItem(this.dicts.CheckStatus, "value", action)["label"]
      }成功`
    );
    this.getList();
  }
}
</script>
