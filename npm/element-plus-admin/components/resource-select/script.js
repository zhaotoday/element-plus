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
    labelKey: {
      type: String,
      default: "name",
    },
    api: {
      type: Object,
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

    onMounted(async () => {
      list.value = await props.api.get({});
    });

    const onChange = (index) => {
      context.emit("update:value", index);
    };

    return {
      list,
      onChange,
    };
  },
};
