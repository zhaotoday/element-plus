<template>
  <div class="flex items-center justify-between">
    <div v-if="showHeader" class="pb-18px">
      <slot name="actions" />
    </div>
    <div class="[&_.el-form-item]:mr-12px! [&_.el-form-item:last-child]:mr-0!">
      <slot name="filter" />
    </div>
  </div>
  <slot />
  <div class="pt-18px">
    <slot name="pagination" />
  </div>
</template>

<script setup lang="ts">
/**
 * 列表页布局：顶部操作/筛选区、默认插槽列表、底部分页。
 * 插槽：actions、filter、default、pagination。
 */
withDefaults(
  defineProps<{
    /** 是否显示顶部操作栏（actions + filter） */
    showHeader?: boolean;
  }>(),
  {
    showHeader: true,
  },
);
</script>
