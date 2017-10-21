<template>
  <div class="main">
    <Header></Header>
    <div class="body">
      <router-view></router-view>
    </div>
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
