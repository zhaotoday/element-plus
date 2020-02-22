import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class FormMixin extends Vue {
  @Watch("detail")
  onDetailChange(newVal) {
    this.$set(this.cForm, "model", newVal);
  }

  resetFields(data = {}) {
    this.$refs.form.resetFields();
    this.$set(this.cForm, "model", this.$helpers.deepCopy(data));
  }

  initFields(data = {}) {
    this.$set(this.cForm, "model", this.$helpers.deepCopy(data));
  }

  getDetail(module, id) {
    return this.$store.dispatch(`${module}/getDetail`, { id });
  }

  handleDatePickerChange(key, value) {
    this.$set(this.cForm.model, key, value);
  }

  handleUploaderChange(key, value) {
    this.$set(this.cForm.model, key, value ? value.id : "");
  }

  handleEditorChange(key, value) {
    this.$set(this.cForm.model, key, value);
  }
}
