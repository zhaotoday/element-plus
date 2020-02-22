<template>
  <div class="c-list__search">
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class ListSearch extends Vue {}
</script>

<style lang="scss" src="./style.scss"></style>
