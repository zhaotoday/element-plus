<template>
  <div class="main">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>
<script>
  import Header from './components/Header'

  export default {
    name: 'main',
    components: {
      Header
    }
  }
</script>

<style lang="scss" scoped src="./styles/index.scss">
</style>
