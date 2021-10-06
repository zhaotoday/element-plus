import { watch } from "vue";
import { deepCopy } from "jt-helpers";

export const useFormDialog = ({ cDialog, cForm, form, initialModel } = {}) => {
  watch(
    () => cDialog.visible,
    (newVal) => {
      if (!newVal) {
        cForm.model = deepCopy(initialModel);
        form.value && form.value.resetFields();
      }
    }
  );

  const show = ({ id, ...rest } = {}) => {
    cForm.id = id || 0;
    cForm.model = { ...initialModel, ...rest };

    cDialog.visible = true;
    form.value && form.value.resetFields();
  };

  const validateField = (field) => {
    form.value.validateField(field);
  };

  const validate = () => {
    return new Promise((resolve, reject) => {
      form.value.validate(async (valid) => {
        if (valid) {
          resolve(cForm);
        } else {
          reject();
        }
      });
    });
  };

  return {
    show,
    validate,
    validateField,
  };
};
