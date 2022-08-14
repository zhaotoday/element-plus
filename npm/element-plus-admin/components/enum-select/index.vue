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
      v-for="item in items"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script src="./script.js"></script>
