<template>
  <div class="header">
    <div class="header-center">
      <div class="logo" @click="$router.push('/')">
        <I type="manage" />
        <h2>后台管理系统</h2>
      </div>
      <div class="user">当前用户：admin</div>
      <div class="logout" title="退出" @click="handleLogout">
        <I type="logout" />
      </div>
    </div>
  </div>
</template>

<script>
  import I from '@/components/I'

  export default {
    name: 'header',
    components: {
      I
    },
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
