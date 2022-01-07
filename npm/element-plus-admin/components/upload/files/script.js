import { computed, reactive, ref, watch } from "vue";
import { useHelpers } from "@/composables/use-helpers";
import OfficeViewer from "../../office-viewer/index.vue";
import { ElMessage } from "element-plus";
import { Document, CircleCheck, Close } from "@element-plus/icons";
import { publicFilesApi } from "../../../apis/public/files";
import { useStore } from "vuex";
import { useConsts } from "@/composables/use-consts";

export default {
  components: {
    "el-icon-document": Document,
    "el-circle-check": CircleCheck,
    "el-close": Close,
    "c-office-viewer": OfficeViewer,
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

    const officeViewer = ref(null);

    const cImageViewer = reactive({
      visible: false,
      index: -1,
    });

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

    const previewOffice = ({ dir, uuid, ext }) => {
      const url = `${useConsts().StaticUrl}/${dir}/${uuid}.${ext}`;

      officeViewer.value.show({ src: url });
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
