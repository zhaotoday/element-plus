<template>
  <i class="iconfont" :class="'icon-' + type"></i>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

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
