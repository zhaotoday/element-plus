<template>
  <Select
    :placeholder="placeholder"
    clearable
    filterable
    :multiple="multiple"
    :value.sync="value"
    @on-change="change"
  >
    <Option v-for="item in items" :key="item.id" :value="item.id">
      {{ item.name }}
    </Option>
  </Select>
</template>

<script src="./script.js"></script>
