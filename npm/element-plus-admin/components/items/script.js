import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    ids: {
      type: Array,
      default: () => [],
    },
    className: {
      type: String,
      default: "",
    },
    labelKey: {
      type: String,
      default: "name",
    },
    resource: String,
    api: Object,
  },
  setup(props) {
    const { state, dispatch } = useStore();

    const items = computed(() =>
      state.items.data[props.resource]
        ? state.items.data[props.resource][props.ids.join(",")]
        : {}
    );

    watch(
      () => props.ids,
      async (newVal) => {
        if (newVal && newVal.length) {
          await dispatch("items/getItems", {
            resource: props.resource,
            api: props.api,
            ids: newVal,
          });
        } else {
          items.value = [];
        }
      },
      { immediate: true, deep: true }
    );

    return {
      items,
    };
  },
};
