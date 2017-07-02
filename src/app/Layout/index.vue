<template>
  <div>
    <Header></Header>
    <div class="main">
      <Sidebar ref="sidebar" />
      <Body />
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar'
  import Header from './components/Header'
  import Body from './components/Body'

  export default {
    name: 'layout',
    components: {
      Sidebar,
      Header,
      Body
    },
    beforeRouteUpdate (to, from, next) {
      this.$nextTick(() => {
        this.$refs.sidebar.update(to)
      })
      next()
    }
  }
</script>


<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
