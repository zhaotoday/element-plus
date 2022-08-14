<template>
  <el-select
    :placeholder="placeholder"
    :multiple="multiple"
    :clearable="clearable"
    collapse-tags
    :model-value="value"
    @change="onChange"
  >
    <el-option
      v-for="item in list.items"
      :key="item.id"
      :label="
        typeof optionLabel === 'function'
          ? optionLabel(item)
          : item[optionLabel]
      "
      :value="item.id"
    />
  </el-select>
</template>

<script src="./script.js"></script>
