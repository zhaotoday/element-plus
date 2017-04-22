<template>
  <div class="header">
    <Button type="ghost" size="large" shape="circle" icon="social-windows">后台管理系统</Button>
    <div class="operations">
      <Button-group>
        <Button type="ghost" shape="circle" icon="android-person">当前用户：admin</Button>
        <Button type="ghost" shape="circle" icon="log-out">退出</Button>
      </Button-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header'
  }
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
