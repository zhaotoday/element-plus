import { reactive, ref } from "vue";

export default {
  setup() {
    const cDialog = reactive({
      visible: false,
    });

    const detail = ref({});

    const show = (data) => {
      detail.value = data;
    };

    return {
      cDialog,
      show,
    };
  },
};
