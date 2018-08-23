<template>
  <i class="iconfont" :class="'icon-' + type" />
</template>

<script>
  export default {
    name: 'CIcon',
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
