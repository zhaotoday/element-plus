import { onMounted, ref } from "vue";

export default {
  props: {
    labelKey: {
      type: String,
      default: "name",
    },
    api: {
      type: Object,
      default: () => null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
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
