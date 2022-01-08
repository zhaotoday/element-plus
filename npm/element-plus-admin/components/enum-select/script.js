import { onMounted, ref } from "vue";

export default {
  props: {
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
  emits: ["update:value"],
  setup(props, context) {
    const onChange = (index) => {
      context.emit("update:value", index);
    };

    return {
      onChange,
    };
  },
};
