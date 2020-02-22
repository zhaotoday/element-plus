export default {
  watch: {
    detail: {
      handler(newVal) {
        this.$set(this.cForm, "formValidate", newVal);
      }
    }
  },
  methods: {
    resetFields(data = {}) {
      this.$refs.formValidate.resetFields();
      this.$set(this.cForm, "formValidate", this.$helpers.deepCopy(data));
    },
    initFields(data = {}) {
      this.$set(this.cForm, "formValidate", this.$helpers.deepCopy(data));
    },
    getDetail(module, id) {
      return this.$store.dispatch(`${module}/getDetail`, { id });
    },
    handleDatePickerChange(key, value) {
      this.$set(this.cForm.formValidate, key, value);
    },
    handleUploaderChange(key, value) {
      this.$set(this.cForm.formValidate, key, value ? value.id : "");
    },
    handleEditorChange(key, value) {
      this.$set(this.cForm.formValidate, key, value);
    }
  }
};
