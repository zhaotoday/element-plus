<template>
  <div>
    <Sidebar ref="sidebar"></Sidebar>
    <Main></Main>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar'
  import Main from './components/Main'

  export default {
    name: 'layout',
    components: {
      Sidebar,
      Main
    },
    beforeRouteUpdate (to, from, next) {
      this.$nextTick(() => {
        this.$refs.sidebar.update(to)
      })
      next()
    }
  }
</script>
