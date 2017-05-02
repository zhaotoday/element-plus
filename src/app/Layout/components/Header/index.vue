<template>
  <div class="header">
    <div class="header-center">
      <Button type="ghost" size="large" icon="social-windows" @click="redirectHome">后台管理系统</Button>
      <div class="operations">
        <Button-group size="small">
          <Button type="ghost" icon="android-person">当前用户：admin</Button>
          <Button type="ghost" icon="log-out" @click="logout">退出</Button>
        </Button-group>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    methods: {
      redirectHome () {
        this.$router.push('/')
      },
      logout () {
        this.$router.push('/logout')
        this.$Message.success('退出成功')
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
