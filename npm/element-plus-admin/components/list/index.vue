<template>
  <div
    v-if="showHeader"
    class="c-list__header"
    :class="{ 'is-simple': simpleHeader }"
  >
    <div class="c-list__operations">
      <slot name="operations" />
    </div>
    <div class="c-list__filters">
      <slot name="filters" />
    </div>
  </div>
  <slot name="default" />
  <div v-if="showPagination" class="c-list__pagination">
    <el-pagination
      background
      @current-change="$emit('page-change', $event)"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    />
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
