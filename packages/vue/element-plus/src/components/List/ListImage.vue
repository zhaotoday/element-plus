<template>
  <div v-if="imageList.length > 0" class="relative leading-0">
    <el-image
      class="rounded-4px block cursor-pointer"
      :style="sizeStyle"
      :src="imageList[0]"
      fit="cover"
      :preview-src-list="imageList"
      preview-teleported
      title="查看大图"
    />
    <div
      v-if="imageList.length > 1"
      class="absolute bottom-6px right-6px bg-black bg-opacity-60 text-white text-xs px-6px py-2px rounded-2px select-none"
    >
      {{ imageList.length }}张
    </div>
  </div>
  <div
    v-else
    class="rounded-4px bg-gray-200 flex items-center justify-center"
    :style="sizeStyle"
  >
    <span class="text-gray-400 text-sm select-none">{{ placeholder }}</span>
  </div>
</template>

<script setup lang="ts">
/**
 * 列表项图片展示。支持单图/多图、尺寸与占位，多图时可预览大图。
 */
const props = withDefaults(
  defineProps<{
    /** 图片地址，支持单个 URL 或 URL 数组（多图时显示张数角标） */
    src?: string | string[];
    /** 容器宽度，如 "100px" */
    width?: string;
    /** 容器高度，如 "100px" */
    height?: string;
    /** 无图片时的占位文字 */
    placeholder?: string;
  }>(),
  {
    width: "100px",
    height: "100px",
    placeholder: "暂无图片",
  },
);

/** 标准化后的图片 URL 列表，将单个 URL 字符串统一转为数组 */
const imageList = computed(() => {
  if (!props.src) return [];
  return Array.isArray(props.src) ? props.src : [props.src];
});

/** 容器尺寸样式对象，由 width 和 height 属性生成 */
const sizeStyle = computed(() => ({
  width: props.width,
  height: props.height,
}));
</script>
