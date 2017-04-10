<template>
  <div>
    <div v-text="msg"></div>
    <div @click="login">click login</div>
  </div>
</template>

<script>
  import auth from '@/utils/auth'

  export default {
    data () {
      return {
        msg: 'login'
      }
    },
    methods: {
      login () {
        this.$router.push(this.$route.query.redirect)
        auth.login()
      }
    }
  }
</script>
