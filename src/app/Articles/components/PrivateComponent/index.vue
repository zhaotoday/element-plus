<template>
  <div class="private-component">
    {{ msg }}
  </div>
</template>

<script>
  export default {
    name: 'private-component',
    data () {
      return {
        msg: 'private component'
      }
    }
  }
</script>

<style scoped>
  .private-component {
    color: red;
  }
</style>
