<template>
  <span class="c-wx-user-info">
    {{ detail.nickName }}
  </span>
</template>

<script>
import { Vue, Component, Watch } from "vue-property-decorator";
import WxUsersModel from "@/models/admin/wx-users";

@Component({
  props: {
    pk: {
      type: Number,
      default: 0
    }
  }
})
export default class WxUserInfo extends Vue {
  detail = {};

  @Watch("pk", { deep: true, immediate: true })
  onPkChange(newVal) {
    newVal && this.getDetail();
  }

  async getDetail() {
    const { data } = await new WxUsersModel().GET({ id: this.pk });
    this.detail = data;
  }
}
</script>
