import { useConsts } from "@/composables/use-consts";
import { useAuth } from "../../composables/use-auth";
import { useHelpers } from "@/composables/use-helpers";
import Files from "./files/index.vue";
import { onMounted, reactive } from "vue";
import { aliCloudOss } from "./utils/alicloud-oss";
import { FilesApi } from "@/apis/admin/files";

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
      default: "small",
    },
    buttonClass: String,
    showUploaded: {
      type: Boolean,
      default: true,
    },
    uploadTo: {
      type: String,
      default: "Server",
    },
    value: {
      type: [Number, Array],
      default: 0,
    },
    tip: {
      type: String,
      default: "",
    },
    headers: Object,
    data: Object,
  },
  emits: ["update:value", "change", "success", "error"],
  setup(props, context) {
    const { deepCopy } = useHelpers();
    const { getRequestHeaders } = useAuth();

    const cUpload = reactive({
      progress: 0,
    });

    let aliCloudOssClient = null;

    onMounted(async () => {
      switch (props.uploadTo) {
        case "AliCloudOss":
          aliCloudOssClient = await aliCloudOss.getClient();
          break;

        default:
          break;
      }
    });

    const beforeUpload = async (file) => {
      if (props.uploadTo === "Server") {
        return Promise.resolve();
      } else {
        const { name, type, size } = file;
        const ext = name.split(".").pop();

        const { id, date, uuid } = await new FilesApi().post({
          action: "create",
        });

        switch (props.uploadTo) {
          case "AliCloudOss":
            await aliCloudOssClient.multipartUpload(
              `${date}/${uuid}.${ext}`,
              file,
              {
                progress(p) {
                  cUpload.progress = +(p * 100).toFixed(0);
                },
                parallel: 4,
                partSize: 1024 * 1024,
                meta: { year: 2020, people: "test" },
                mime: "text/plain",
              }
            );
            break;

          default:
            break;
        }

        await new FilesApi().post({
          action: "update",
          body: { date, uuid, name, type, ext, size },
        });

        if (props.multiple) {
          const value = props.value ? [...props.value, id] : [id];

          context.emit("update:value", value);
          context.emit("change", value);
        } else {
          context.emit("update:value", id);
          context.emit("change", id);
        }

        return Promise.reject();
      }
    };

    const onSuccess = (res) => {
      context.emit("success", res.data);

      const { id } = res.data;

      if (props.multiple) {
        const value = props.value ? [...props.value, id] : [id];

        context.emit("update:value", value);
        context.emit("change", value);
      } else {
        context.emit("update:value", id);
        context.emit("change", id);
      }
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
      getRequestHeaders,
      beforeUpload,
      onSuccess,
      onError,
      onDelete,
    };
  },
};
