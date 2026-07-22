<template>
  <div
    class="fixed inset-x-0 inset-y-80px bg-center bg-[length:auto_100%]"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="relative w-1280px mx-auto h-full">
      <img
        class="absolute top-1/2 left-0 -translate-y-1/2 block w-442px h-380px"
        :src="iconImage"
        alt="登录装饰图"
      />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 登录页主内容区。带背景图与左侧装饰图，中间通过默认插槽放表单等。
 */
import bgImage from "../../assets/login/bg.png";
import iconImage from "../../assets/login/icon.png";
</script>
