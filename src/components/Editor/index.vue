<template>
  <div></div>
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

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
