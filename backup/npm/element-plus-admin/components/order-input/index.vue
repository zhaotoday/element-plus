<template>
  <el-input-number
    size="small"
    :min="1"
    :max="1000000"
    v-model="row.order"
    style="width: 100%"
    @change="onChange"
  />
</template>

<script src="./script.js"></script>
