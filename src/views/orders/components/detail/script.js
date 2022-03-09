import { reactive } from "vue";

export default {
  setup() {
    const cDialog = reactive({
      visible: true,
    });

    const show = () => {};

    return {
      cDialog,
      show,
    };
  },
};
