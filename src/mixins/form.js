import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class FormMixin extends Vue {
  @Watch("detail")
  onDetailChange(newVal) {
    this.$set(this.cForm, "model", newVal);
  }

  @Watch("cForm.modal")
  onModal(newVal) {
    if (!newVal) {
      this.resetFormFields();
    }
  }

  getDetail(module, id) {
    return this.$store.dispatch(`${module}/getDetail`, { id });
  }

  initFormFields(data = {}) {
    this.$set(this.cForm, "model", this.$helpers.deepCopy(data));
  }

  resetFormFields(data = {}) {
    this.$refs.form.resetFields();
    this.$set(this.cForm, "model", this.$helpers.deepCopy(data));
  }

  handleFormDatePickerChange(key, value) {
    this.$set(this.cForm.model, key, value);
  }

  handleFormUploaderChange(key, value) {
    this.$set(this.cForm.model, key, value ? value.id : "");
  }

  handleFormEditorChange(key, value) {
    this.$set(this.cForm.model, key, value);
  }

  fixFormButtonLoading() {
    this.cForm.loading = false;

    const messageChannel = new MessageChannel();
    const port = messageChannel.port2;

    messageChannel.port1.onmessage = () => {
      this.cForm.loading = true;
    };
    port.postMessage(1);
  }
}
