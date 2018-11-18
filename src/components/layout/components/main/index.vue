<template>
  <div class="c-main">
    <TheHeader />
    <div class="c-main__body">
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

<style
  lang="scss"
  src="./styles/index.scss">
</style>
