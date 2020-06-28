<template>
  <i class="c-iconfont" :class="'c-iconfont--' + type"></i>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    type: {
      type: String,
      default: ""
    }
  }
})
export default class Icon extends Vue {}
</script>

<style lang="scss" src="./style.scss"></style>
