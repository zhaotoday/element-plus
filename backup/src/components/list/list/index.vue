<template>
  <div>
    <slot></slot>
    <Table
      :context="$parent"
      class="u-mb15"
      border
      :columns="columns"
      :data="data"
      @on-selection-change="handleSelectionChange"
    />
    <Page
      :total="total"
      :current="pageCurrent"
      :page-size="$consts.PageSize"
      show-total
      show-elevator
      @on-change="handlePageChange"
    />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Array,
      default() {
        return [];
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
      default() {
        return {};
      }
    }
  }
})
export default class List extends Vue {
  handleSelectionChange(selection) {
    this.$emit("selection-change", selection);
  }

  handlePageChange(current) {
    this.$router.push({
      query: Object.assign(
        { listPageCurrent: current },
        this.searchWhere
          ? { listSearchWhere: JSON.stringify(this.searchWhere) }
          : null
      )
    });
  }
}
</script>
