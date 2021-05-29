<template>
  <div class="c-header">
    <div class="c-header__logout" title="退出" @click="logout">
      <el-avatar icon="el-icon-right" size="small" />
    </div>
    <div class="c-header__user">{{ user.name }}</div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
