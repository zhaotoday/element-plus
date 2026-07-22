<template>
  <el-input-number
    v-model="item.order"
    size="small"
    :min="1"
    :max="1000000"
    :disabled="loading"
    style="width: 100%"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
/**
 * 排序数字输入。修改条目的 order 后通过 API 提交更新（防抖），成功后触发 success。
 */
import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import type { AxiosInstance } from "axios";
import type { OrderableItem } from "../types";

const props = withDefaults(
  defineProps<{
    /** 需要排序的条目（含 id、order） */
    item: OrderableItem;
    /** Axios 实例，用于提交排序接口 */
    request: AxiosInstance;
    /** API 请求路径（会拼上 /:id/actions/order） */
    url: string;
    /** 附加查询参数，如 where 等 */
    query?: Record<string, any>;
  }>(),
  {
    query: () => ({}),
  },
);

const emit = defineEmits<{
  /** 排序更新成功时触发 */
  success: [];
}>();

const loading = ref(false);

const handleChange = useDebounceFn(async (value: number | undefined) => {
  if (value == null) return;
  loading.value = true;
  try {
    await props.request.post(
      `${props.url}/${props.item.id}/actions/order`,
      { action: "update", order: value },
      {
        params: {
          where: {
            id: { $ne: 0 },
            ...props.query?.where,
          },
        },
      },
    );
    emit("success");
  } finally {
    loading.value = false;
  }
}, 200);
</script>
