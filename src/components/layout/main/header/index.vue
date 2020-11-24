<template>
  <div class="c-header">
    <div class="c-header__logout" title="退出" @click="logout">
      <Avatar icon="md-log-out"></Avatar>
    </div>
    <div class="c-header__user">{{ user.username }}</div>
    <div class="c-header__avatar">
      <Avatar icon="ios-person"></Avatar>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
