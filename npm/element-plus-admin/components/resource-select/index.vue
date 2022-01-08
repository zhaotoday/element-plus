<template>
  <el-select
    :placeholder="placeholder"
    :multiple="multiple"
    :clearable="clearable"
    :model-value="value"
    @change="onChange"
  >
    <el-option
      v-for="item in list.items"
      :key="item.id"
      :label="item[labelKey]"
      :value="item.id"
    />
  </el-select>
</template>

<script src="./script.js"></script>
