<template>
  <div class="c-sidebar">
    <el-menu
      :default-active="activeKey"
      background-color="#409eff"
      text-color="#fff"
      active-text-color="#409eff"
      unique-opened
      @select="onSelect"
    >
      <el-menu-item v-if="showHome" index="-1">
        <i class="c-iconfont c-iconfont--home-filled"></i>
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu
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
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
