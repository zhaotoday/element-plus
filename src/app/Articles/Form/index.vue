<template>
  <div>
    <div>{{ msg }}</div>
    <private-component></private-component>
  </div>
</template>

<script>
  import PrivateComponent from '../components/PrivateComponent'
  export default {
    data () {
      return {
        msg: 'article form'
      }
    },
    components: {PrivateComponent}
  }
</script>
