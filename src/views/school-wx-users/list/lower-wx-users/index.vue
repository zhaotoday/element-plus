<template>
  <Modal width="550" title="分销下线" v-model.trim="cForm.modal">
    <div style="max-height: 400px; overflow-x: hidden; overflow-y: auto;">
      <c-list
        :show-page="false"
        :page-size="100"
        :data="cList.data"
        :columns="cList.columns"
      >
      </c-list>
    </div>
  </Modal>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import ListMixin from "view-ui-admin/src/mixins/list";
import Model from "@/models/admin/school-wx-users";

@Component({
  mixins: [RouteParamsMixin, ListMixin]
})
export default class extends Vue {
  data() {
    const { ListColumnWidth } = this.$consts;

    return {
      cForm: {
        modal: false
      },
      cList: {
        data: [],
        columns: [
          {
            title: "头像",
            width: 118,
            render: (h, { row }) => {
              return h("c-list-image", {
                props: {
                  src: row.wxUser.avatarUrl
                }
              });
            }
          },
          {
            title: "昵称",
            minWidth: ListColumnWidth.User,
            render: (h, { row }) => h("span", row.wxUser.nickName)
          }
        ]
      }
    };
  }

  @Watch("cForm.modal")
  onModal(newVal) {
    if (!newVal) {
      this.cList.data = [];
    }
  }

  async show(wxUserId) {
    this.cForm.modal = true;
    this.cList.data = await this.getListItems(wxUserId);
  }

  async getListItems(wxUserId) {
    const {
      data: { items }
    } = await new Model().GET({
      query: {
        where: {
          schoolId: { $eq: this.getSchoolId() },
          upperWxUserId: { $eq: wxUserId }
        },
        include: [{ model: "WxUser", as: "wxUser" }]
      }
    });
    return items;
  }
}
</script>
