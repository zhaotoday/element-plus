<template>
  <el-table-column v-bind="$attrs">
    <template v-if="$slots.default" #default="scope">
      <slot v-bind="scope" />
    </template>
    <template v-if="$slots.header" #header="scope">
      <slot name="header" v-bind="scope" />
    </template>
  </el-table-column>
</template>

<script setup lang="ts" generic="Row extends Record<string, any>">
/**
 * 类型化的 ElTableColumn 封装：为作用域插槽（default/header）标注具体的 Row 类型，
 * 使模板中 `{ row }` 能按泛型 Row 推断类型，同时保留原生 ElTableColumn 的全部 props
 * （label、prop、sortable、formatter 等经 $attrs 透传，无需重复声明）。
 *
 * Row 类型通过 rows 这个 prop 的值自动推断，rows 本身不参与渲染，
 * 只需传入与 el-table 的 :data 相同的数组即可，无需任何额外的类型标注：
 *
 *   <TypedTableColumn :rows="state.items" label="手机号">
 *     <template #default="{ row }">{{ row.phoneNumber }}</template>
 *   </TypedTableColumn>
 */
import type { TableColumnCtx } from "element-plus";

defineProps<{
  /** 仅用于推断 Row 泛型类型，传入与 el-table :data 相同的数组即可，不参与渲染 */
  rows: Row[];
}>();

defineSlots<{
  default?: (scope: {
    row: Row;
    column: TableColumnCtx<Row>;
    $index: number;
  }) => any;
  header?: (scope: { column: TableColumnCtx<Row>; $index: number }) => any;
}>();
</script>
