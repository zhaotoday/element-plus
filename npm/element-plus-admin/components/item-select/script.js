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
    value: {
      type: [String, Number],
    },
    labelKey: {
      type: String,
      default: "name",
    },
    api: Object,
  },
  emits: ["update:value"],
  setup(props, context) {
    const list = ref({
      items: [],
    });

    onMounted(async () => {
      list.value = await new props.api().get({});
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
