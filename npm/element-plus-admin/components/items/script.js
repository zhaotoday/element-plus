import { ref, watch } from "vue";

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
    api: Object,
  },
  setup(props) {
    const items = ref([]);

    watch(
      () => props.ids,
      async (newVal) => {
        if (newVal && newVal.length) {
          const res = await props.api.post({
            action: "findAllByIds",
            body: { ids: newVal },
          });

          items.value = res.items;
        }
      },
      { immediate: true, deep: true }
    );

    return {};
  },
};
