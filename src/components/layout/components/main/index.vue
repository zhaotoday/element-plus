<template>
  <div class="c-main">
    <the-header></the-header>
    <div class="c-main__body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import TheHeader from "./components/header";

@Component({
  components: {
    TheHeader
  }
})
export default class TheMain extends Vue {}
</script>

<style lang="scss" src="./style.scss"></style>
