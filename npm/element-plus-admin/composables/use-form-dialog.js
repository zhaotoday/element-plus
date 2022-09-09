import { watch } from "vue";
import { deepCopy } from "jt-helpers";

export const useFormDialog = ({
  cDialog,
  cForm,
  formRef,
  initialModel,
} = {}) => {
  watch(
    () => cDialog.visible,
    (newVal) => {
      if (!newVal) {
        cForm.model = deepCopy(initialModel);
        formRef.value && formRef.value.resetFields();
      }
    }
  );

  const show = ({ id, ...rest } = {}) => {
    cForm.id = id || 0;
    cForm.model = { ...initialModel, ...rest };

    cDialog.visible = true;
    formRef.value && formRef.value.resetFields();
  };

  const validateField = (field) => {
    formRef.value.validateField(field);
  };

  const validate = () => {
    return new Promise((resolve, reject) => {
      formRef.value.validate(async (valid) => {
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
