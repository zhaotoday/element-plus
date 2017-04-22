<template>
  <div>
    <Header></Header>
    <div class="main">
      <Sidebar></Sidebar>
      <Body></Body>
    </div>
  </div>
</template>

<script>
  import Sidebar from './children/sidebar'
  import Header from './children/header'
  import Body from './children/body'

  export default {
    name: 'layout',
    components: {
      Sidebar,
      Header,
      Body
    }
  }
</script>


<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
