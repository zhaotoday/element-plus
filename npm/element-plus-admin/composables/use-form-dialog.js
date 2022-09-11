import { watch } from "vue";
import { deepCopy } from "jt-helpers";
import { ElMessage } from "element-plus";

export const useFormDialog = ({
  context,
  api,
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

  const submit = async () => {
    const { id, model } = await validate();

    await api[id ? "put" : "post"]({ id, body: model });
    ElMessage.success(id ? "修改成功" : "新增成功");
    context.emit("ok");
    cDialog.visible = false;
  };

  return {
    show,
    validate,
    validateField,
    submit,
  };
};
