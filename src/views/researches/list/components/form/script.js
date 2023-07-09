import { reactive, ref } from "vue";
import { useHelpers } from "@/composables/use-helpers";
import { researchesApi } from "@/apis/admin/researches";
import { ElMessage } from "element-plus";
import { useValidators } from "vue-validation";
import { useFormDialog } from "element-plus-admin/composables/use-form-dialog";

export default {
  props: {
    path: String,
  },
  emits: ["ok"],
  setup(props, context) {
    const formRef = ref(null);

    const { deepCopy } = useHelpers();

    const { isRequired } = useValidators();

    const cDialog = reactive({
      visible: false,
    });

    const initialModel = {};

    const cForm = reactive({
      id: 0,
      model: deepCopy(initialModel),
      rules: {
        title: [isRequired({ label: "标题" })],
        content: [isRequired({ label: "内容" })],
      },
    });

    const { show, validate, validateField } = useFormDialog({
      cDialog,
      cForm,
      formRef,
      initialModel,
    });

    const submit = async () => {
      const { id, model } = await validate();

      await researchesApi[id ? "put" : "post"]({
        id,
        body: { ...model, path: props.path },
        query: {
          where: { path: props.path },
        },
      });
      ElMessage.success(id ? "修改成功" : "新增成功");
      context.emit("ok");
      cDialog.visible = false;
    };

    return {
      formRef,
      cDialog,
      cForm,
      show,
      validateField,
      submit,
    };
  },
};
