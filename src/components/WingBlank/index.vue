<!--
两翼留白
@example
<WingBlank size="sm" :dirs="['left']">
  ...
</WingBlank>
-->
<template>
  <span :class="[size, ...dirs]">
    <slot></slot>
  </span>
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
          return ['left', 'right']
        }
      }
    }
  }
</script>

<style lang="scss" scoped src="./styles/index.scss">
</style>
