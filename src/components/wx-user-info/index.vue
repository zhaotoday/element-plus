<template>
  <span class="c-wx-user-info">
    {{
      (detail.name ? detail.name : "") +
        (detail.phoneNumber ? `（${detail.phoneNumber}）` : "")
    }}
  </span>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import WxUsersModel from "@/models/admin/wx-users";

@Component({
  props: {
    id: {
      type: Number,
      default: 0
    }
  }
})
export default class WxUserInfo extends Vue {
  detail = {};

  created() {
    this.getDetail();
  }

  async getDetail() {
    const { data } = await new WxUsersModel().GET({ id: this.id });
    this.detail = data;
  }
}
</script>
