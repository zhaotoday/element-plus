import { onMounted, ref } from "vue";

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
    optionLabel: {
      type: [String, Function],
      default: "name",
    },
    api: {
      type: [Object, Function],
      default: () => null,
    },
    value: {
      type: [String, Number],
    },
  },
  emits: ["update:value"],
  setup(props, context) {
    const list = ref({
      items: [],
    });

    const render = async () => {
      list.value =
        typeof props.api === "function"
          ? await props.api()
          : await props.api.get({});
    };

    onMounted(async () => {
      await render();
    });

    const onChange = (index) => {
      context.emit("update:value", index);
    };

    return {
      list,
      render,
      onChange,
    };
  },
};
