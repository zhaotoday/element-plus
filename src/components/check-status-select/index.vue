<template>
  <Select
    placeholder="请选择审核状态"
    clearable
    :value.sync="value"
    @on-change="change"
  >
    <Option
      v-for="item in dicts.CheckStatus"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </Option>
  </Select>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    value: {
      type: [String, Number],
      default: ""
    }
  }
})
export default class CheckStatusSelect extends Vue {
  change(value) {
    this.$emit("change", value);
  }
}
</script>
