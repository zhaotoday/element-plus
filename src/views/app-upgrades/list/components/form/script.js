import { reactive, ref } from "vue";
import { useHelpers } from "@/composables/use-helpers";
import { ElMessage } from "element-plus";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { useValidators } from "vue-validation";
import { useFormDialog } from "element-plus-admin/composables/use-form-dialog";
import { tencentCloudCosApi } from "@/apis/admin/tencent-cloud-cos";
import { filesApi } from "@/apis/admin/files";
import { UploadTo } from "element-plus-admin/enums/upload-to";
import { appUpgradesApi } from "@/apis/admin/app-upgrades";

export default {
  emits: ["render-list"],
  setup(props, context) {
    const form = ref(null);

    const { deepCopy } = useHelpers();

    const { isRequired } = useValidators();

    const { enums } = useEnums();

    const cDialog = reactive({
      visible: false,
    });

    const initialModel = {
      status: 1,
    };

    const cForm = reactive({
      id: 0,
      model: deepCopy(initialModel),
      rules: {
        versionName: [isRequired({ label: "版本号" })],
        versionCode: [isRequired({ label: "版本代码" })],
        fileId: [isRequired({ label: "应用文件" })],
        log: [isRequired({ label: "更新日志" })],
      },
    });

    const { show, validate, validateField } = useFormDialog({
      cDialog,
      cForm,
      form,
      initialModel,
    });

    const submit = async () => {
      const { id, model } = await validate();

      await appUpgradesApi[id ? "put" : "post"]({ id, body: model });
      ElMessage.success(id ? "修改成功" : "新增成功");
      context.emit("render-list");
      cDialog.visible = false;
    };

    return {
      tencentCloudCosApi,
      filesApi,
      UploadTo,
      enums,
      form,
      cDialog,
      cForm,
      show,
      validateField,
      submit,
    };
  },
};
