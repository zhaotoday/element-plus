<template>
  <Select
    placeholder="请选择商品"
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

<script>
import { Component, Vue } from "vue-property-decorator";
import Model from "@/models/admin/products";

@Component({
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Array, String, Number],
      default: ""
    }
  }
})
export default class ProductSelect extends Vue {
  items = [];

  async created() {
    const {
      data: { items }
    } = await new Model().GET({});
    this.items = items;
  }

  change(value) {
    this.$emit("change", value);
  }
}
</script>
