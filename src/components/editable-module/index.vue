<template>
  <div
    class="c-editable-module"
    :class="{ 'is-active': active }"
    @click="$emit('select')"
  >
    <slot name="component"></slot>
    <div class="c-editable-module__overlay"></div>
    <ButtonGroup
      v-if="!isFixed"
      class="c-editable-module__actions"
      size="small"
    >
      <Button type="error" size="small" @click="handleDelete">删除</Button>
    </ButtonGroup>
    <div class="ivu-poptip-popper" x-placement="right-start">
      <div class="ivu-poptip-content">
        <div class="ivu-poptip-arrow"></div>
        <div class="ivu-poptip-inner">
          <div class="ivu-poptip-body">
            <div class="ivu-poptip-body-content">
              <slot name="editor"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    active: {
      type: Boolean,
      default: false
    },
    isFixed: {
      type: Boolean,
      default: false
    }
  }
})
export default class EditableModule extends Vue {
  handleDelete() {
    this.$Modal.confirm({
      title: "请确认",
      content: "确认删除？",
      onOk: () => {
        this.$emit("delete");
      }
    });
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
