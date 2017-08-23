<!--
上下留白
@example
<WhiteSpace size="sm" :dirs="['top']">
  ...
</WhiteSpace>
-->
<template>
  <div :class="[size, ...dirs]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'padding',
    props: {
      size: {
        type: String,
        default: 'md'
      },
      dirs: {
        type: Array,
        default () {
          return ['top', 'bottom']
        }
      }
    }
  }
</script>

<style lang="scss" scoped src="./styles/index.scss">
</style>
