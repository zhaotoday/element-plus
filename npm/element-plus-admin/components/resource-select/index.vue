<template>
  <el-select
    :placeholder="placeholder"
    :multiple="multiple"
    :clearable="clearable"
    :filterable="filterable"
    collapse-tags
    :model-value="list.items.length ? value : ''"
    @change="onChange"
  >
    <el-option
      v-for="(item, index) in list.items"
      :key="item.id"
      :label="
        typeof optionLabel === 'function'
          ? optionLabel(item, index)
          : item[optionLabel]
      "
      :value="item.id"
    >
      <slot
        name="option"
        :label="
          typeof optionLabel === 'function'
            ? optionLabel(item)
            : item[optionLabel]
        "
        :value="item.id"
        :item="item"
      />
    </el-option>
  </el-select>
</template>

<script src="./script.js"></script>
