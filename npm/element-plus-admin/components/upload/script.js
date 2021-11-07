import { useConsts } from "@/composables/use-consts";
import { useAuth } from "element-plus-admin/composables/use-auth";
import { useHelpers } from "@/composables/use-helpers";
import Files from "./files/index.vue";

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
      getRequestHeaders,
      onSuccess,
      onError,
      onDelete,
    };
  },
};
