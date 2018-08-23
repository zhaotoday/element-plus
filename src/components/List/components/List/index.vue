<template>
  <div>
    <slot />
    <Table
      :context="$parent"
      class="margin-bottom"
      border
      :columns="columns"
      :data="data"
      :selection="[1]"
      @on-selection-change="handleSectionChange" />
    <Page
      :total="total"
      :current="current"
      :page-size="consts.PAGE_SIZE"
      show-total show-elevator
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
        default: 0
      }
    },
    data () {
      return {
        selection: []
      }
    },
    methods: {
      handleSectionChange (selection) {
        this.selection = selection
      },

      handlePageChange (current) {
        this.$emit('on-change', current)
      }
    }
  }
</script>
