<template>
  <router-view></router-view>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Root extends Vue {}
</script>
