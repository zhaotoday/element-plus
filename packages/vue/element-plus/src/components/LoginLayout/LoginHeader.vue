<template>
  <div class="fixed inset-x-0 top-0 h-80px bg-white">
    <div class="w-1280px mx-auto h-full relative">
      <div class="absolute left-0 top-1/2 -translate-y-1/2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 登录页顶部区域，固定高度 80px，内容区 1280px 居中。
 */
</script>
