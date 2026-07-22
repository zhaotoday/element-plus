<template>
  <el-select
    v-bind="$attrs"
    v-model="model"
    :placeholder="placeholder"
    :multiple="multiple"
    :clearable="clearable"
    collapse-tags
    @change="handleChange"
  >
    <el-option
      v-for="item in items"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">
/**
 * 枚举下拉选择。基于本地 items（EnumItem[]），支持多选与 v-model。
 */
import type { EnumItem } from "../types";

withDefaults(
  defineProps<{
    /** 占位提示文本 */
    placeholder?: string;
    /** 是否支持多选 */
    multiple?: boolean;
    /** 是否可清空选择 */
    clearable?: boolean;
    /** 枚举选项列表 */
    items: EnumItem[];
  }>(),
  {
    placeholder: "请选择",
    multiple: false,
    clearable: true,
    items: () => [],
  },
);

/** 当前选中值（v-model 双向绑定） */
const model = defineModel<string | number | (string | number)[]>();

const emit = defineEmits<{
  /** 选中值变化时触发 */
  change: [value: string | number | (string | number)[]];
}>();

function handleChange(value: string | number | (string | number)[]) {
  emit("change", value);
}
</script>
