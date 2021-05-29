<template>
  <div class="c-main">
    <the-header />
    <div class="c-main__body">
      <router-view />
    </div>
    <el-breadcrumb class="c-main__breadcrumb" separator="/">
      <el-breadcrumb-item>{{ menus[0].title }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ menus[1].title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
