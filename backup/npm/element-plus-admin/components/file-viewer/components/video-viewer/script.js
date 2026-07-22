import { reactive, watch } from "vue";

export default {
  setup() {
    const cDialog = reactive({
      visible: false,
      src: "",
    });

    watch(
      () => cDialog.visible,
      (newVal) => {
        if (!newVal) {
          cDialog.src = "";
        }
      }
    );

    const show = ({ src }) => {
      cDialog.visible = true;
      cDialog.src = src;
    };

    return {
      cDialog,
      show,
    };
  },
};
