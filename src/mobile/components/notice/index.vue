<template>
  <div class="c-notice bgc11" @click="goLink">
    <i class="c-iconfont c-iconfont--notice c21 fs30"></i>
    <i class="c-iconfont c-iconfont--more c21 fs24"></i>
    <div class="c-notice__text fs24">{{ items[0] ? items[0].title : "" }}</div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
