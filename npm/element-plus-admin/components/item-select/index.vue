<template>
  <el-select
    :multiple="multiple"
    :filterable="filterable"
    :clearable="clearable"
    :model-value="value"
    @change="onChange"
  >
    <el-option
      v-for="item in items"
      :key="item.id"
      :label="item[labelKey]"
      :value="item.id"
    />
  </el-select>
</template>

<script src="./script.js"></script>
