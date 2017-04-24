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
  import Sidebar from './components/Sidebar'
  import Header from './components/Header'
  import Body from './components/Body'

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
