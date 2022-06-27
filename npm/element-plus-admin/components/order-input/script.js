import { debounce } from "lodash";

export default {
  props: {
    row: Object,
    api: Object,
    where: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["ok"],
  setup(props, context) {
    const onChange = debounce(async (value) => {
      await props.api.post({
        joinUrl: `/${props.row.id}/actions/order`,
        query: {
          where: {
            id: { $ne: 0 },
            ...props.where,
          },
        },
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
