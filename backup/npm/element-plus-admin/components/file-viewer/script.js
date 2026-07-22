import { ElMessage } from "element-plus";
import { useConsts } from "@/composables/use-consts";
import { reactive, ref } from "vue";
import OfficeViewer from "./components/office-viewer/index.vue";

export default {
  components: {
    "c-office-viewer": OfficeViewer,
  },
  props: {
    urls: {
      type: Array,
      default: () => [],
    },
    officeViewerServiceUrl: String,
  },
  setup() {
    const officeViewer = ref(null);

    const cImageViewer = reactive({
      visible: false,
      index: -1,
    });

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

    const previewOffice = ({ dir, date, uuid, ext }) => {
      const url = `${useConsts().StaticUrl}/${
        dir ? `${dir}/` : ""
      }${date}/${uuid}.${ext}`;

      officeViewer.value.show({ src: url });
    };

    return {
      officeViewer,
      cImageViewer,
      preview,
    };
  },
};
