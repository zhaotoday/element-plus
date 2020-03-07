<template>
  <Select
    placeholder="请选择用户"
    clearable
    filterable
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
      {{ item.nickName }}
    </Option>
  </Select>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import Model from "@/models/admin/wx-users";

@Component({
  props: {
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
export default class WxUserSelect extends Vue {
  items = [];

  async created() {
    this.items = await this.getList();
  }

  async getList() {
    const {
      data: { items }
    } = await new Model().GET({
      query: {
        offset: 0,
        limit: 1000
      }
    });

    return items;
  }

  change(value) {
    this.$emit("change", value);
  }
}
</script>
