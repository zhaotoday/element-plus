import { ref, watch } from "vue";
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
    api: Object,
  },
  setup(props) {
    const { dispatch } = useStore();

    const items = ref([]);

    watch(
      () => props.ids,
      async (newVal) => {
        if (newVal && newVal.length) {
          const { resource, api } = props;

          items.value = await dispatch("items/getItems", {
            resource,
            api,
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
