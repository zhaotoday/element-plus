<template>
  <div>
    <slot></slot>
    <Table
      :context="$parent"
      class="margin-bottom"
      border
      :columns="columns"
      :data="data" />
    <Page
      :total="total"
      :current="current"
      :page-size="consts.PAGE_SIZE"
      show-total
      show-elevator
      @on-change="handlePageChange" />
  </div>
</template>

<script>
  export default {
    name: 'CList',
    props: {
      current: {
        type: Number,
        default: 1
      },
      columns: {
        type: Array,
        default () {
          return []
        }
      },
      data: {
        type: Array,
        default () {
          return []
        }
      },
      total: {
        type: Number,
        default: 1
      }
    },
    methods: {
      handlePageChange (current) {
        this.$emit('on-page-change', current)
      }
    }
  }
</script>
