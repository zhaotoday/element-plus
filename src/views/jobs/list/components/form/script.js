import { reactive, ref } from "vue";
import { useHelpers } from "@/composables/use-helpers";
import { adsApi } from "@/apis/admin/ads";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { useValidators } from "vue-validation";
import { useFormDialog } from "element-plus-admin/composables/use-form-dialog";
import { tencentCloudCosApi } from "@/apis/admin/tencent-cloud-cos";
import { filesApi } from "@/apis/admin/files";
import { UploadTo } from "element-plus-admin/enums/upload-to";

export default {
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
        imageFileId: [isRequired({ message: "请选择广告图片" })],
      },
    });

    const { show, validateField, submit } = useFormDialog({
      api: adsApi,
      cDialog,
      cForm,
      formRef,
      initialModel,
      onOk() {
        context.emit("ok");
      },
    });

    return {
      tencentCloudCosApi,
      filesApi,
      UploadTo,
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
