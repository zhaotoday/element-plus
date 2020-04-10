<template>
  <div class="c-list__search">
    <slot></slot>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ListSearch extends Vue {}
</script>

<style lang="scss" src="./style.scss"></style>
