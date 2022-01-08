import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

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
    filterable: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    automaticDropdown: {
      type: Boolean,
      default: false,
    },
    collapseTags: {
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
    const select = ref(null);

    const { state, dispatch } = useStore();

    const resource = props.api.config.url.split("/").slice(-1)[0];

    const items = computed(() =>
      state.items.data[resource] ? state.items.data[resource]["__"] : {}
    );

    onMounted(async () => {
      await dispatch("items/getItems", {
        resource,
        api: props.api,
      });
    });

    const focus = () => {
      select.value.focus();
    };

    const onChange = (index) => {
      context.emit("update:value", index);
    };

    return {
      select,
      items,
      focus,
      onChange,
    };
  },
};
