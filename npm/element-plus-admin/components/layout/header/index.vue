<template>
  <div class="c-header">
    <div class="c-header__logo" @click="$router.push('/')">
      <slot name="logo" />
    </div>
    <div class="c-header__user">
      {{ userName }}
      <el-avatar
        icon="el-icon-right"
        title="退出"
        :size="36"
        @click="$emit('logout')"
      />
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
