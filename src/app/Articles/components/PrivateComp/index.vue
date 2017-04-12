<template>
  <div class="private-comp">
    <div v-text="msg"></div>
  </div>
</template>

<script>
  export default {
    name: 'private-comp',
    data () {
      return {
        msg: 'private comp'
      }
    }
  }
</script>

<style scoped>
  .private-comp {
    color: red;
  }
</style>
