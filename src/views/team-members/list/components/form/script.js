import { reactive, ref } from "vue";
import { useHelpers } from "@/composables/use-helpers";
import { teamMembersApi } from "@/apis/admin/team-members";
import { ElMessage } from "element-plus";
import { useEnums } from "element-plus-admin/composables/use-enums";
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

    const { enums } = useEnums();

    const cDialog = reactive({
      visible: false,
    });

    const initialModel = {};

    const cForm = reactive({
      id: 0,
      model: deepCopy(initialModel),
      rules: {
        name: [isRequired({ label: "姓名" })],
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

      await teamMembersApi[id ? "put" : "post"]({
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
      enums,
      formRef,
      cDialog,
      cForm,
      show,
      validateField,
      submit,
    };
  },
};
