<template>
  <the-header :user-name="user.name" @logout="logout">
    <template #logo>
      <img src="/fjqshadmin/static/logo.png" style="border-radius: 50%" />
      后台管理系统
    </template>
  </the-header>
  <the-sidebar show-home :menus="getMenus()" />
  <the-main :menus="getMenus()" />
</template>

<script src="./script.js"></script>
