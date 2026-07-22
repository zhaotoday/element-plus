<template>
  <el-select
    v-bind="$attrs"
    v-model="model"
    :placeholder="placeholder"
    :multiple="multiple"
    :clearable="clearable"
    :filterable="filterable"
    :loading="isLoading"
    :disabled="disabled || isLoading"
    collapse-tags
    @change="handleChange"
  >
    <template v-if="!isLoading && list.items.length === 0">
      <el-option disabled value="" label="暂无数据" />
    </template>
    <el-option
      v-for="(item, index) in list.items"
      :key="getItemKey(item, index)"
      :label="getOptionLabel(item, index)"
      :value="getItemValue(item)"
      :disabled="isItemDisabled(item)"
    >
      <slot
        name="option"
        :label="getOptionLabel(item, index)"
        :value="getItemValue(item)"
        :item="item"
        :index="index"
      />
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
/**
 * 远程数据下拉选择。通过 Axios 请求 URL 拉取选项，支持多选、搜索、自定义 label/value/key。
 * 暴露 refresh、isLoading 供外部调用。
 */
import { useAsyncState } from "@vueuse/core";
import type { AxiosInstance } from "axios";

/** 选中值可能的类型 */
type ModelValue = string | number | boolean | object | unknown[];

/** 选项数据项 */
type OptionItem = Record<string, any>;

/** 远程接口返回的数据结构（经拦截器解包后为 { items, total }） */
type ResourceResponse = { items: OptionItem[]; total: number };

const props = withDefaults(
  defineProps<{
    /** 占位提示文本 */
    placeholder?: string;
    /** 是否支持多选 */
    multiple?: boolean;
    /** 是否可清空选择 */
    clearable?: boolean;
    /** 是否可搜索过滤 */
    filterable?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 选项标签的字段名或自定义格式化函数 */
    optionLabel?: string | ((item: OptionItem, index?: number) => string);
    /** 选项值的字段名或自定义取值函数 */
    optionValue?: string | ((item: OptionItem) => unknown);
    /** 选项唯一标识的字段名 */
    optionKey?: string;
    /** 自定义选项禁用判断函数 */
    optionDisabled?: (item: OptionItem) => boolean;
    /** Axios 实例，用于发起 API 请求 */
    request: AxiosInstance;
    /** API 请求路径 */
    url: string;
    /** 是否在组件挂载时立即加载数据 */
    immediate?: boolean;
    /** API 请求附加参数 */
    query?: Record<string, unknown>;
  }>(),
  {
    placeholder: "请选择",
    multiple: false,
    clearable: true,
    filterable: true,
    disabled: false,
    optionLabel: "name",
    optionValue: "id",
    optionKey: "id",
    immediate: true,
    query: () => ({}),
  },
);

/** 当前选中值（v-model 双向绑定） */
const model = defineModel<ModelValue>();

const emit = defineEmits<{
  /** 选中值变化时触发 */
  change: [value: ModelValue];
  /** 数据加载成功时触发 */
  loadSuccess: [data: OptionItem[]];
  /** 数据加载失败时触发 */
  loadError: [error: Error];
}>();

/** 远程数据列表状态，包含总数和选项数组 */
const list = reactive<{ total: number; items: OptionItem[] }>({
  total: 0,
  items: [],
});

const { isLoading, execute } = useAsyncState(
  async () => {
    const response = await props.request.get<unknown, ResourceResponse>(
      props.url,
      { params: props.query },
    );
    list.items = response.items;
    list.total = response.total;
    emit("loadSuccess", list.items);
    return list.items;
  },
  [],
  {
    immediate: props.immediate,
    onError: (error) => {
      console.error("加载资源数据失败:", error);
      list.items = [];
      list.total = 0;
      emit("loadError", error as Error);
    },
  },
);

/**
 * 获取选项的唯一键值，优先使用 optionKey 字段，回退为索引。
 *
 * @param item - 选项数据对象
 * @param index - 选项在列表中的索引
 */
function getItemKey(item: OptionItem, index: number): string | number {
  return item[props.optionKey] ?? index;
}

/**
 * 获取选项的绑定值，支持字段名或自定义取值函数。
 *
 * @param item - 选项数据对象
 */
function getItemValue(item: OptionItem): any {
  return typeof props.optionValue === "function"
    ? props.optionValue(item)
    : item[props.optionValue];
}

/**
 * 获取选项的显示文本，支持字段名或自定义格式化函数。
 *
 * @param item - 选项数据对象
 * @param index - 选项在列表中的索引
 */
function getOptionLabel(item: OptionItem, index?: number): string {
  return typeof props.optionLabel === "function"
    ? props.optionLabel(item, index)
    : (item[props.optionLabel] ?? "");
}

/**
 * 判断选项是否被禁用。
 *
 * @param item - 选项数据对象
 */
function isItemDisabled(item: OptionItem): boolean {
  return props.optionDisabled ? props.optionDisabled(item) : false;
}

function handleChange(value: ModelValue) {
  emit("change", value);
}

/** 重新请求远程数据，刷新选项列表 */
function refresh() {
  return execute();
}

defineExpose({
  /** 重新加载选项数据 */
  refresh,
  /** 是否正在加载 */
  isLoading,
});
</script>
