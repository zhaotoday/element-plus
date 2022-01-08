export default {
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
      default: () => [],
    },
    value: {
      type: [String, Number],
    },
  },
  emits: ["update:value", "change"],
  setup(props, context) {
    const onChange = (value) => {
      context.emit("update:value", value);
      context.emit("change", value);
    };

    return {
      onChange,
    };
  },
};
