<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  created() {
    this.updateDicts();
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
