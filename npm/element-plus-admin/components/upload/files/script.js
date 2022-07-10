import { computed, ref, watch } from "vue";
import { useHelpers } from "@/composables/use-helpers";
import { CircleCheck, Close, Document } from "@element-plus/icons-vue";
import FileViewer from "../../file-viewer/index.vue";
import { publicFilesApi } from "../../../apis/public/files";
import { useStore } from "vuex";

export default {
  components: {
    "el-icon-document": Document,
    "el-circle-check": CircleCheck,
    "el-close": Close,
    "c-file-viewer": FileViewer,
  },
  props: {
    ids: {
      type: Array,
      default: () => [],
    },
    officeViewerServiceUrl: String,
  },
  setup(props) {
    const { state, dispatch } = useStore();

    const { getFileUrl } = useHelpers();

    const fileViewer = ref(null);

    const files = computed(() => {
      return state.items.data.files && props.ids
        ? state.items.data.files[props.ids.join(",")] || []
        : [];
    });

    watch(
      () => props.ids,
      async (newVal) => {
        if (newVal && newVal.length) {
          await dispatch("items/getItems", {
            resource: "files",
            api: publicFilesApi,
            ids: newVal,
          });
        } else {
          files.value = [];
        }
      },
      { immediate: true, deep: true }
    );

    return {
      fileViewer,
      files,
      getFileUrl,
    };
  },
};
