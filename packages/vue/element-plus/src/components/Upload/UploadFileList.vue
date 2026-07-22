<template>
  <div class="w-full">
    <draggable
      v-model="fileList"
      item-key="uid"
      :animation="300"
      handle=".handle"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <template #item="{ element: file, index }">
        <div
          class="relative flex items-center justify-between bg-white leading-30px rounded-6px border-1px border-gray-200 hover:border-gray-300 mb-10px"
          :class="{ 'cursor-move handle': canDrag }"
          :title="canDrag ? '拖动排序' : ''"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = -1"
        >
          <el-icon class="w-36px">
            <Document />
          </el-icon>
          <div class="flex-1 mr-50px truncate">{{ file.name }}</div>
          <el-icon
            v-show="isDeleteVisible(index)"
            class="absolute top-1/2 -translate-y-1/2 right-10px cursor-pointer text-18px"
            title="删除"
            @click="removeFile(index)"
          >
            <Close />
          </el-icon>
        </div>
      </template>
    </draggable>
    <div v-show="fileList.length < limit" class="mb-10px">
      <slot name="upload" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 上传文件列表展示。支持拖拽排序、悬停显示删除，通过 slot upload 嵌入上传入口。
 */
import { Close, Document } from "@element-plus/icons-vue";
import type { UploadUserFile } from "element-plus";
import draggable from "vuedraggable";

defineProps<{
  /** 最大文件数量，未达上限时显示上传插槽 */
  limit: number;
}>();

/** 文件列表数据（v-model 双向绑定） */
const fileList = defineModel<UploadUserFile[]>({ required: true });

/** 当前鼠标悬停的文件项索引 */
const hoveredIndex = ref(-1);
/** 是否正在拖拽排序 */
const isDragging = ref(false);

/** 是否可拖拽排序（文件数大于 1 时启用） */
const canDrag = computed(() => fileList.value.length > 1);

/** 判断指定索引的删除按钮是否可见（悬停且非拖拽状态） */
function isDeleteVisible(index: number) {
  return index === hoveredIndex.value && !isDragging.value;
}

/** 移除指定索引的文件 */
function removeFile(index: number) {
  fileList.value.splice(index, 1);
}
</script>
