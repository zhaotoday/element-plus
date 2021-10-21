import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    filterable: {
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
    resource: String,
    api: Object,
  },
  emits: ["update:value"],
  setup(props, context) {
    const { state, dispatch } = useStore();

    const items = computed(() =>
      state.items.data[props.resource]
        ? state.items.data[props.resource]["__"]
        : {}
    );

    onMounted(async () => {
      await dispatch("items/getItems", {
        resource: props.resource,
        Api: props.api,
      });
    });

    const onChange = (index) => {
      context.emit("update:value", index);
    };

    return {
      items,
      onChange,
    };
  },
};
