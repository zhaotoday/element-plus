<template>
  <the-header :user-name="user.name" @logout="logout">
    <template #logo>
      <img
        src="https://element-plus.org/images/formmaking.png"
        style="border-radius: 50%"
      />
      后台管理系统
    </template>
  </the-header>
  <the-sidebar show-home />
  <the-main />
</template>

<script src="./script.js"></script>
