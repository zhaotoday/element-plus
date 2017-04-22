<template>
  <div class="header">
    <div class="header-center">
      <Button type="ghost" size="large" shape="circle" icon="social-windows">后台管理系统</Button>
      <div class="operations">
        <Button-group>
          <Button type="ghost" shape="circle" icon="android-person">当前用户：admin</Button>
          <Button type="ghost" shape="circle" icon="log-out" @click="handleLogout">退出</Button>
        </Button-group>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    methods: {
      handleLogout () {
        this.$router.push('/logout')
        this.$Message.success('退出成功')
      }
    }
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
