import { reactive, ref, watch } from "vue";
import { FilesApi } from "@/apis/admin/files";
import { useHelpers } from "@/composables/use-helpers";

export default {
  props: {
    ids: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { getImageUrl } = useHelpers();

    const cImageViewer = reactive({
      visible: false,
      index: -1,
    });

    const files = ref([]);

    watch(
      () => props.ids,
      async (newVal) => {
        if (newVal) {
          const { items } = await new FilesApi().get({
            query: {
              where: {
                id: { $in: newVal },
              },
            },
          });

          files.value = items.map(({ id, name }) => ({
            id,
            name,
            url: getImageUrl({ id }),
          }));
        }
      },
      { immediate: true, deep: true }
    );

    const previewImage = (index) => {
      cImageViewer.index = index;
      cImageViewer.visible = true;
    };

    return {
      getImageUrl,
      cImageViewer,
      files,
      previewImage,
    };
  },
};
