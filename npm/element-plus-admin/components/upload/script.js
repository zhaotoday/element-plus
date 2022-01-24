import { useConsts } from "@/composables/use-consts";
import { useAuth } from "../../composables/use-auth";
import { useHelpers } from "@/composables/use-helpers";
import Files from "./files/index.vue";
import { onMounted, reactive } from "vue";
import { useCos } from "./composables/use-cos";
import { UploadTo } from "../../enums/upload-to";

const { ApiUrl } = useConsts();

export default {
  components: {
    "cc-files": Files,
  },
  props: {
    action: {
      type: String,
      default: `${ApiUrl}/admin/files/actions/upload`,
    },
    headers: Object,
    data: Object,
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请选择文件",
    },
    buttonSize: {
      type: String,
      default: "default",
    },
    buttonClass: String,
    showUploaded: {
      type: Boolean,
      default: true,
    },
    fileDir: {
      type: String,
      default: "",
    },
    cosConfig: {
      type: Object,
      default: () => null,
    },
    value: {
      type: [Number, Array],
      default: 0,
    },
    tip: {
      type: String,
      default: "",
    },
    officeViewerServiceUrl: String,
  },
  emits: ["update:value", "change", "success", "error"],
  setup(props, context) {
    const { deepCopy } = useHelpers();

    const { getHeaders } = useAuth();

    const cUpload = reactive({
      progress: 0,
    });

    const cos = useCos({
      ...props.cosConfig,
      onProgress(progress) {
        cUpload.progress = progress;
      },
    });

    onMounted(async () => {
      switch (props.cosConfig.uploadTo) {
        case UploadTo.AliCloudOss:
          await cos.initialize();
          break;

        default:
          break;
      }
    });

    const update = (id) => {
      if (props.multiple) {
        const value = props.value ? [...props.value, id] : [id];

        context.emit("update:value", value);
        context.emit("change", value);
      } else {
        context.emit("update:value", id);
        context.emit("change", id);
      }
    };

    const beforeUpload = async (file) => {
      if (props.uploadTo === "Server") {
        return Promise.resolve();
      } else {
        switch (props.uploadTo) {
          case "AliCloudOss":
            update((await cos.upload(file, props.fileDir)).id);
            break;

          default:
            break;
        }

        return Promise.reject();
      }
    };

    const onSuccess = (res) => {
      context.emit("success", res.data);
      update(res.data.id);
    };

    const onError = (err, file, fileList) => {
      context.emit("error", { err, file, fileList });
    };

    const onDelete = (index) => {
      if (props.multiple) {
        const value = deepCopy(props.value);

        value.splice(index, 1);

        context.emit("update:value", value);
        context.emit("change", value);
      } else {
        context.emit("update:value", undefined);
        context.emit("change", undefined);
      }
    };

    return {
      cUpload,
      getHeaders,
      beforeUpload,
      onSuccess,
      onError,
      onDelete,
    };
  },
};
