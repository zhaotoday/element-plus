<template>
  <div>
    <div>{{ msg }}</div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'articles'
      }
    }
  }
</script>
