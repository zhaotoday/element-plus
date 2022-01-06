<template>
  <div class="c-sidebar">
    <div class="c-sidebar__logo" @click="router.push('/questions/list')">
      <div class="c-sidebar__logo-icon">
        <el-avatar icon="el-icon-eleme" size="small" />
      </div>
      后台管理系统
    </div>
    <el-menu
      :default-active="activeKey"
      background-color="#001529"
      text-color="#fff"
      active-text-color="white"
      unique-opened
      @select="onSelect"
    >
      <el-submenu
        v-for="(item1, index1) in $consts.SidebarMenu"
        :key="index1"
        :index="`${index1}`"
      >
        <template #title>
          <i class="c-iconfont" :class="`c-iconfont--${item1.icon}`"></i>
          <span>{{ item1.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(item2, index2) in item1.children"
            :key="index2"
            :index="`${index1}-${index2}`"
          >
            {{ item2.title }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
