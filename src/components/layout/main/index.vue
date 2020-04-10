<template>
  <div class="c-main">
    <the-header></the-header>
    <div class="c-main__body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "./header";

@Component({
  components: {
    TheHeader
  }
})
export default class TheMain extends Vue {}
</script>

<style lang="scss" src="./style.scss"></style>
