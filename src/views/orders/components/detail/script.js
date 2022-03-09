import { reactive } from "vue";

export default {
  setup() {
    const cDialog = reactive({
      visible: true,
    });

    return {
      cDialog,
    };
  },
};
