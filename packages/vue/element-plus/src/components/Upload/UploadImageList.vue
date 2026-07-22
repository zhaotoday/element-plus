<template>
  <div class="flex flex-wrap gap-10px">
    <draggable
      v-if="fileList.length > 0"
      v-model="fileList"
      item-key="uid"
      :animation="300"
      handle=".handle"
      class="flex flex-wrap gap-10px"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <template #item="{ element: file, index }">
        <div
          :class="{ 'cursor-move handle': canDrag }"
          :title="canDrag ? '拖动排序' : ''"
        >
          <div
            class="relative w-100px h-100px rounded-6px border-1px border-gray-200 overflow-hidden"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = -1"
          >
            <img class="w-full h-full object-contain" :src="file.url" alt="" />
            <div
              v-show="isActionsVisible(index)"
              class="absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center gap-4px text-24px text-white"
            >
              <el-icon
                class="cursor-pointer"
                title="预览"
                @click="previewImage(index)"
              >
                <ZoomIn />
              </el-icon>
              <el-icon
                class="cursor-pointer"
                title="删除"
                @click="removeImage(index)"
              >
                <Delete />
              </el-icon>
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <div v-show="fileList.length < limit">
      <slot name="upload" />
    </div>
  </div>
  <el-image-viewer
    v-if="isViewerVisible"
    :url-list="imageUrls"
    :initial-index="viewerIndex"
    @close="viewerIndex = -1"
  />
</template>

<script setup lang="ts">
/**
 * 上传图片列表展示。支持拖拽排序、悬停预览/删除，通过 slot upload 嵌入上传入口。
 */
import { Delete, ZoomIn } from "@element-plus/icons-vue";
import type { UploadUserFile } from "element-plus";
import draggable from "vuedraggable";

defineProps<{
  /** 最大图片数量，未达上限时显示上传插槽 */
  limit: number;
}>();

/** 图片列表数据（v-model 双向绑定） */
const fileList = defineModel<UploadUserFile[]>({ required: true });

/** 当前鼠标悬停的图片项索引 */
const hoveredIndex = ref(-1);
/** 是否正在拖拽排序 */
const isDragging = ref(false);
/** 当前预览图片的索引，-1 表示关闭预览 */
const viewerIndex = ref(-1);

/** 是否可拖拽排序（图片数大于 1 时启用） */
const canDrag = computed(() => fileList.value.length > 1);
/** 图片预览器是否可见 */
const isViewerVisible = computed(() => viewerIndex.value > -1);
/** 所有图片的 URL 列表，供 el-image-viewer 使用 */
const imageUrls = computed(() =>
  fileList.value
    .map(({ url }) => url)
    .filter((url): url is string => Boolean(url)),
);

/** 判断指定索引的操作按钮（预览/删除）是否可见 */
function isActionsVisible(index: number) {
  return index === hoveredIndex.value && !isDragging.value;
}

/** 移除指定索引的图片 */
function removeImage(index: number) {
  fileList.value.splice(index, 1);
}

/** 打开指定索引的图片预览 */
function previewImage(index: number) {
  viewerIndex.value = index;
}
</script>
