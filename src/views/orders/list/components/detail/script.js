import { reactive, ref } from "vue";
import { useEnums } from "element-plus-admin/composables/use-enums";

export default {
  setup() {
    const { enums } = useEnums();

    const cDialog = reactive({
      visible: false,
    });

    const detail = ref({});

    const show = (data) => {
      detail.value = data;
      cDialog.visible = true;
    };

    return {
      enums,
      cDialog,
      detail,
      show,
    };
  },
};
