import { reactive, watch } from "vue";

export default {
  props: {
    serviceUrl: String,
  },
  setup(props) {
    const cDialog = reactive({
      visible: false,
      serviceUrl:
        props.serviceUrl ||
        "https://view.officeapps.live.com/op/view.aspx?src=",
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

      if (serviceUrl) {
        cDialog.serviceUrl = serviceUrl;
      }

      cDialog.src = src;
    };

    return {
      cDialog,
      show,
    };
  },
};
