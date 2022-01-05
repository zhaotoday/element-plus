import { reactive, ref, watch } from "vue";
import { useHelpers } from "@/composables/use-helpers";
import OfficeViewer from "../office-viewer/index.vue";
import { ElMessage } from "element-plus";
import { publicFilesApi } from "../../apis/public/files";

export default {
  components: {
    "c-office-viewer": OfficeViewer,
  },
  props: {
    ids: {
      type: Array,
      default: () => [],
    },
    className: {
      type: String,
      default: "",
    },
    canPreview: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { getFileUrl } = useHelpers();

    const officeViewer = ref(null);

    const cImageViewer = reactive({
      visible: false,
      index: -1,
    });

    const files = ref([]);

    watch(
      () => props.ids,
      async (newVal) => {
        if (newVal && newVal.length) {
          const { items } = await publicFilesApi.post({
            action: "findAllByIds",
            body: { ids: newVal },
          });

          files.value = items.map(({ id, name, ext }) => ({
            id,
            name,
            ext,
            url: getFileUrl({ id }),
          }));
        } else {
          files.value = [];
        }
      },
      { immediate: true, deep: true }
    );

    const preview = (file, index) => {
      if (!props.canPreview) return;

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
