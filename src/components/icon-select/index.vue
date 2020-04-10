<template>
  <Select
    class="c-icon-select"
    placeholder="请选择图标"
    clearable
    :value.sync="value"
    @on-change="change"
  >
    <c-icon
      v-if="value"
      class="c-icon-select__prefix"
      slot="prefix"
      size="small"
      :type="value"
    ></c-icon>
    <Option v-for="item in dicts.Icon" :key="item.value" :value="item.value">
      <c-icon class="c-icon-select__option-icon" :type="item.value"></c-icon>
      {{ item.label }}
    </Option>
  </Select>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    value: {
      type: [Array, String, Number],
      default: ""
    }
  }
})
export default class IconSelect extends Vue {
  change(value) {
    this.$emit("change", value);
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
