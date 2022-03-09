import { reactive, ref } from "vue";

export default {
  setup() {
    const cDialog = reactive({
      visible: false,
    });

    const detail = ref({});

    const show = (data) => {
      console.log(data, "abc");
      detail.value = data;
      cDialog.visible = true;
    };

    return {
      cDialog,
      detail,
      show,
    };
  },
};
