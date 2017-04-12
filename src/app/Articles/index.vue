<template>
  <div>
    <div>{{ msg }}</div>
    <router-view></router-view>
  </div>
</template>

<script>
  import './i18n'

  export default {
    data () {
      return {
        msg: 'articles'
      }
    }
  }
</script>
