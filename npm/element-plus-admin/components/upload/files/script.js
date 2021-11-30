import { computed, reactive, ref, watch } from "vue";
import { useHelpers } from "@/composables/use-helpers";
import OfficeViewer from "../../../components/office-viewer/index.vue";
import { ElMessage } from "element-plus";
import { PublicFilesApi } from "../../../apis/public/files";
import { useStore } from "vuex";

export default {
  components: {
    "c-office-viewer": OfficeViewer,
  },
  props: {
    ids: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { state, dispatch } = useStore();

    const { getFileUrl } = useHelpers();

    const officeViewer = ref(null);

    const cImageViewer = reactive({
      visible: false,
      index: -1,
    });

    const files = computed(() => {
      console.log(state.items.data.files, "--");

      return state.items.data.files
        ? (state.items.data.files[props.ids.join(",")] || []).map(
            ({ id, name, ext }) => ({
              id,
              name,
              ext,
              url: getFileUrl({ id }),
            })
          )
        : [];
    });

    watch(
      () => props.ids,
      async (newVal) => {
        if (newVal && newVal.length) {
          await dispatch("items/getItems", {
            resource: "files",
            Api: PublicFilesApi,
            ids: newVal,
          });
        } else {
          files.value = [];
        }
      },
      { immediate: true, deep: true }
    );

    const preview = (file, index) => {
      switch (true) {
        case ["jpg", "jpeg", "png", "gif"].includes(file.ext):
          previewImage(index);
          break;

        case ["ppt", "pptx", "doc", "docx", "xls", "xlsx"].includes(file.ext):
          previewOffice(file);
          break;

        default:
          ElMessage.error("该文件类型暂不支持预览");
          break;
      }
    };

    const previewImage = (index) => {
      cImageViewer.index = index;
      cImageViewer.visible = true;
    };

    const previewOffice = ({ id }) => {
      officeViewer.value.show({ src: getFileUrl({ id }) });
    };

    return {
      officeViewer,
      cImageViewer,
      files,
      getFileUrl,
      preview,
    };
  },
};
