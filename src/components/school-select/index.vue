<template>
  <Select
    :placeholder="placeholder"
    filterable
    clearable
    :multiple="multiple"
    :value.sync="value"
    @on-change="change"
  >
    <Option
      v-for="item in items"
      :key="item.id"
      :value="item.id"
      :label="item.nickName"
    >
      {{ item.name }}
    </Option>
  </Select>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Model from "@/models/admin/schools";

@Component({
  props: {
    placeholder: {
      type: String,
      default: "请选择校区"
    },
    value: {
      type: [String, Number],
      default: 0
    },
    multiple: {
      type: Boolean,
      default: false
    }
  }
})
export default class SchoolSelect extends Vue {
  items = [];

  async created() {
    this.items = await this.getList();
  }

  async getList() {
    const {
      data: { items }
    } = await new Model().GET({ query: {} });

    return items;
  }

  change(value) {
    this.$emit("change", value);
  }
}
</script>
