<template>
  <div>
    <div>header</div>
    <div>sidebar</div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'articles',
    data () {
      return {
        msg: 'articles'
      }
    }
  }
</script>
