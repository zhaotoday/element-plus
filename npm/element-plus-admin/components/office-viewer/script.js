import { reactive, watch } from "vue";

export default {
  setup() {
    const cDialog = reactive({
      visible: false,
      serviceUrl: "https://view.officeapps.live.com/op/view.aspx?src=",
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

    const show = ({ serviceUrl, src }) => {
      cDialog.visible = true;
      cDialog.serviceUrl = serviceUrl;
      cDialog.src = src;
    };

    return {
      cDialog,
      show,
    };
  },
};
