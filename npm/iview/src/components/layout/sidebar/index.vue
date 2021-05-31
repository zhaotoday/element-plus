<template>
  <div class="c-sidebar">
    <div class="c-sidebar__logo" @click="$router.push('/')">
      <div class="c-sidebar__logo-icon">
        <Avatar icon="logo-chrome"></Avatar>
      </div>
      后台管理系统
    </div>
    <Menu
      ref="menu"
      theme="dark"
      :active-name="activeName"
      width="auto"
      :open-names="openNames"
      @on-select="handleSelect"
    >
      <Submenu
        v-for="(menu1, index1) in $consts.SidebarMenu"
        :key="index1"
        :name="menu1.name"
      >
        <template slot="title">
          <Icon :type="menu1.icon" />
          {{ menu1.title }}
        </template>
        <MenuItem
          v-for="(menu2, index2) in menu1.children"
          :key="index2"
          :name="menu2.route"
        >
          {{ menu2.title }}
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
