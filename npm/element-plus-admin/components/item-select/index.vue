<template>
  <el-select
    ref="select"
    :multiple="multiple"
    :filterable="filterable"
    :clearable="clearable"
    :model-value="value"
    @change="onChange"
    @focus="($event) => $emit('focus', $event)"
    @blur="($event) => $emit('blur', $event)"
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
