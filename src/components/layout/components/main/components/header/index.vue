<template>
  <div class="c-header">
    <div
      class="c-header__logout"
      title="退出"
      @click="handleLogout">
      <CIcon type="logout" />
    </div>
    <div class="c-header__user">admin</div>
    <div class="c-header__avatar">
      <Avatar
        style="background-color: #1890ff;"
        icon="ios-person" />
    </div>
  </div>
</template>

<script>
  import CIcon from '@/components/Icon'

  export default {
    name: 'TheHeader',
    components: {
      CIcon
    },
    methods: {
      handleLogout () {
        this.$router.push('/logout')
        this.$Message.success('退出成功')
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
  src="./styles/index.scss">
</style>
