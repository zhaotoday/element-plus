import { reactive, ref } from "vue";
import { useHelpers } from "@/composables/use-helpers";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { useValidators } from "vue-validation";
import { useFormDialog } from "element-plus-admin/composables/use-form-dialog";
import { tencentCloudCosApi } from "@/apis/admin/tencent-cloud-cos";
import { filesApi } from "@/apis/admin/files";
import { categoriesApi } from "@/apis/admin/categories";
import { UploadTo } from "element-plus-admin/enums/upload-to";
import { productsApi } from "@/apis/admin/products";

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
        categoryId: [isRequired({ label: "商品分类" })],
        name: [isRequired({ label: "商品名称" })],
        imageFileIds: [isRequired({ message: "请选择商品图片" })],
      },
    });

    const { show, validateField, submit } = useFormDialog({
      api: productsApi,
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
      categoriesApi,
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
