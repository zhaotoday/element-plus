<template>
  <div class="sidebar">
    <Menu active-name="1-2" width="auto" :open-names="['1']">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-navigate"></Icon>
          导航一



        </template>
        <Menu-item name="1-1">选项 1</Menu-item>
        <Menu-item name="1-2">选项 2</Menu-item>
        <Menu-item name="1-3">选项 3</Menu-item>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-keypad"></Icon>
          导航二



        </template>
        <Menu-item name="2-1">选项 1</Menu-item>
        <Menu-item name="2-2">选项 2</Menu-item>
      </Submenu>
    </Menu>
  </div>
</template>
<script>
  export default {}
</script>

<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
