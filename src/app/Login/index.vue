<template>
  <div @click="login">click login</div>
</template>

<script>
  import auth from '@/utils/auth'
  import Model from '@/models/actions'

  export default {
    name: 'login',
    methods: {
      login () {
        return new Model().POST({
          data: {
            username: 'admin',
            password: '123456'
          }
        }).then((res) => {
          auth.login(res.token)
          this.$router.push(this.$route.query.redirect || '/')
        })
      }
    }
  }
</script>
