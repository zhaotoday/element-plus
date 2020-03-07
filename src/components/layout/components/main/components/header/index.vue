<template>
  <div class="c-header">
    <div class="c-header__logout" title="退出" @click="logout">
      <c-icon type="logout"></c-icon>
    </div>
    <div class="c-header__user">{{ user.username }}</div>
    <div class="c-header__avatar">
      <Avatar style="background-color: #1890ff;" icon="ios-person" />
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class TheHeader extends Vue {
  get user() {
    return this.$auth.get()["user"];
  }

  logout() {
    this.$router.push("/logout");
    this.$Message.success("退出成功");
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
