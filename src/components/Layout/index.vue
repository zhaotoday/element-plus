<template>
  <div>
    <TheSidebar ref="sidebar" />
    <TheMain />
  </div>
</template>

<script>
  import TheSidebar from './components/Sidebar'
  import TheMain from './components/Main'

  export default {
    name: 'TheLayout',
    components: {
      TheSidebar,
      TheMain
    },
    beforeRouteUpdate (to, from, next) {
      this.$nextTick(() => {
        this.$refs.sidebar.update(to)
      })
      next()
    }
  }
</script>
