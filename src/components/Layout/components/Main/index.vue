<template>
  <div class="main">
    <TheHeader />
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import TheHeader from './components/Header'

  export default {
    name: 'TheMain',
    components: {
      TheHeader
    }
  }
</script>

<style lang="scss" scoped src="./styles/index.scss">
</style>
