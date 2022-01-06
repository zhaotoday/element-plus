import { debounce } from "lodash";

export default {
  props: {
    row: Object,
    api: Object,
  },
  emits: ["ok"],
  setup(props, context) {
    const onChange = debounce(async (value) => {
      await props.api.post({
        joinUrl: `${props.row.id}/actions/order`,
        body: {
          action: "Update",
          order: value,
        },
      });

      context.emit("ok");
    }, 500);

    return {
      onChange,
    };
  },
};
