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
        this.$store.dispatch('postActionsLogin', {
          data: {
            username: 'admin',
            password: '123456'
          }
        }).then((res) => {
          auth.login(res.token)
          this.$router.push(this.$route.query.redirect)
        })
      }
    }
  }
</script>
