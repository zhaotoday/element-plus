<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class App extends Vue {
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
