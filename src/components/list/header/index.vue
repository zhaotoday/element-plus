<template>
  <div class="c-list__header">
    <slot></slot>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ListHeader extends Vue {}
</script>

<style lang="scss" src="./style.scss"></style>
