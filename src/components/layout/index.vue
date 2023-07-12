<template>
  <the-header :user-name="user.name" @logout="logout">
    <template #logo>
      <img src="/static/logo.png" style="border-radius: 50%" />
      FAIE 管理后台
    </template>
  </the-header>
  <the-sidebar show-home :menus="getMenus()" />
  <the-main :menus="getMenus()" />
</template>

<script src="./script.js"></script>
