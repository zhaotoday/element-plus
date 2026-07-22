<template>
  <div class="fixed flex w-full h-full">
    <div
      class="w-240px h-full overflow-hidden bg-#fcfcfc border-r-1px border-r-#e7e3e4"
    >
      <slot name="logo" />
      <slot name="menu" />
    </div>
    <div class="flex-1 h-full flex flex-col overflow-hidden">
      <div class="h-60px">
        <slot name="header" />
      </div>
      <div class="flex-1 overflow-x-hidden overflow-y-auto p-20px">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 管理后台布局：左侧 logo + 菜单，右侧顶栏 + 主内容区。
 * 插槽：logo、menu、header、default。
 */
</script>
