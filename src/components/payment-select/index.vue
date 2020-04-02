<template>
  <Select
    placeholder="请选择支付方式"
    clearable
    :value.sync="value"
    @on-change="change"
  >
    <Option
      v-for="item in dicts.OrderPayment"
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
      type: String,
      default: ""
    }
  }
})
export default class PaymentSelect extends Vue {
  change(value) {
    this.$emit("change", value);
  }
}
</script>
