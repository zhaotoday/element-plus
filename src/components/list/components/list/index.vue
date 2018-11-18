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
