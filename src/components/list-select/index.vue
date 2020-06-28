<template>
  <Modal
    width="550"
    title="请选择"
    v-model.trim="cForm.modal"
    ok-text="批量选择"
    @on-ok="submit"
  >
    <div style="max-height: 400px; overflow-x: hidden; overflow-y: auto;">
      <c-mini-list
        ref="miniList"
        :selected-items="selectedItems"
        :items="items"
        selectable
        is-product
        @select="handleSelect"
      ></c-mini-list>
    </div>
  </Modal>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    isProduct: {
      type: Boolean,
      default: false
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  }
})
export default class ListSelect extends Vue {
  cForm = {
    id: 0,
    modal: false
  };

  show() {
    this.cForm.modal = true;
  }

  handleSelect(data) {
    this.cForm.modal = false;
    this.$emit("select", [data]);
  }

  submit() {
    const items = this.$refs.miniList.listSelectedItems;

    this.$emit("select", items);
  }
}
</script>
