<template>
  <router-view></router-view>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Root extends Vue {}
</script>
