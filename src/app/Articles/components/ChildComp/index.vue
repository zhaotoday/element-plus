<template>
  <div>
    <p class="child-comp" v-text="msg"></p>
    <p class="child-comp-img"></p>
  </div>
</template>

<script>
  export default {
    name: 'child-comp',
    data () {
      return {
        msg: 'child comp'
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
