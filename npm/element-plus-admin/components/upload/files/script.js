import { reactive, ref, watch } from "vue";
import { useHelpers } from "@/composables/use-helpers";
import OfficeView from "../../office-view/index.vue";
import { ElMessage } from "element-plus";
import { PublicFilesApi } from "../../../apis/public/files";

export default {
  components: {
    "c-office-view": OfficeView,
  },
  props: {
    ids: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { getFileUrl } = useHelpers();

    const officeView = ref(null);

    const cImageViewer = reactive({
      visible: false,
      index: -1,
    });

    const files = ref([]);

    watch(
      () => props.ids,
      async (newVal) => {
        if (newVal && newVal.length) {
          const { items } = await new PublicFilesApi().post({
            action: "findAllByIds",
            body: { ids: newVal },
          });

          files.value = items.map(({ id, name, ext }) => ({
            id,
            name,
            ext,
            url: getFileUrl({ id }),
          }));
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
      officeView.value.show({ src: getFileUrl({ id }) });
    };

    return {
      officeView,
      cImageViewer,
      files,
      getFileUrl,
      preview,
    };
  },
};
