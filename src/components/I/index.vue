<template>
  <i class="iconfont" :class="'icon-' + type" />
</template>

<script>
  export default {
    name: 'i',
    props: {
      type: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped src="./styles/index.scss">
</style>
