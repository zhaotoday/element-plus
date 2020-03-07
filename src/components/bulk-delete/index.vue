<template>
  <Poptip
    v-if="selectedItems.length"
    confirm
    title="确认删除？"
    @on-ok="handleOk"
    ok-text="确认"
    cancel-text="取消"
  >
    <Button type="primary">
      批量删除
    </Button>
  </Poptip>
  <Button v-else type="primary" @click="handleOk">
    批量删除
  </Button>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    selectedItems: {
      type: Array,
      default: () => []
    }
  }
})
export default class BulkDelete extends Vue {
  handleOk() {
    if (!this.selectedItems.length) {
      this.$Message.error("没有选中记录");
    } else {
      this.$emit("ok", this.selectedItems.map(item => item.id).join(","));
    }
  }
}
</script>
