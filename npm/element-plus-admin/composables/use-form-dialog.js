import { watch } from "vue";
import { deepCopy } from "jt-helpers";
import { ElMessage } from "element-plus";

export const useFormDialog = ({
  api,
  cDialog,
  cForm,
  formRef,
  initialModel,
  onSubmit,
  onOk,
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

  const submit = async () => {
    const { id, model } = await validate();

    if (onSubmit) {
      await onSubmit({ id, model });
    } else {
      await api[id ? "put" : "post"]({ id, body: model });
    }

    ElMessage.success(id ? "修改成功" : "新增成功");
    cDialog.visible = false;
    onOk && onOk();
  };

  return {
    show,
    validate,
    validateField,
    submit,
  };
};
