<template>
  <div class="c-header">
    <div class="c-header__logout" title="退出" @click="logout">
      <Avatar icon="md-log-out"></Avatar>
    </div>
    <div class="c-header__user">{{ user.nickName }}</div>
    <div class="c-header__avatar">
      <Avatar icon="ios-person"></Avatar>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TheHeader extends Vue {
  logout() {
    this.$router.push("/logout");
    this.$Message.success("退出成功");
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
