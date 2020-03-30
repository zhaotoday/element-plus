<template>
  <div class="c-list__operations">
    <slot></slot>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ListOperation extends Vue {}
</script>

<style lang="scss" src="./style.scss"></style>
