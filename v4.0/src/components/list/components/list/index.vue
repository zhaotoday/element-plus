<template>
  <div>
    <slot />
    <Table
      :context="$parent"
      class="u-mb15"
      border
      :columns="columns"
      :data="data"
      @on-selection-change="handleSelectionChange" />
    <Page
      :total="total"
      :current="pageCurrent"
      :page-size="$consts.PAGE_SIZE"
      show-total
      show-elevator
      @on-change="handlePageChange" />
  </div>
</template>

<script>
export default {
  name: 'CList',
  props: {
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
    },
    pageCurrent: {
      type: Number,
      default: 1
    },
    searchWhere: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    handleSelectionChange (selection) {
      this.$emit('selection-change', selection)
    },
    handlePageChange (current) {
      this.$router.push({
        query: Object.assign(
          { listPageCurrent: current },
          this.searchWhere
            ? { listSearchWhere: JSON.stringify(this.searchWhere) }
            : null
        )
      })
    }
  }
}
</script>
