import { ref, watch } from "vue";
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
    value: {
      type: [Number, Array],
      default: 0,
    },
    tip: {
      type: String,
      default: "",
    },
  },
  emits: ["update:value", "change"],
  setup(props, context) {
    const { getImageUrl, deepCopy } = useHelpers();

    const { getRequestHeaders } = useAuth();

    const uploadedFileIds = ref([]);

    const uploadedFileId = ref(undefined);

    watch(
      () => props.value,
      (newVal, oldVal) => {
        if (oldVal === undefined) {
          if (props.multiple) {
            uploadedFileIds.value = deepCopy(props.value);
          } else {
            uploadedFileId.value = props.value;
          }
        } else {
          if (props.multiple) {
            uploadedFileIds.value = [];
          } else {
            uploadedFileId.value = undefined;
          }
        }
      },
      { immediate: true }
    );

    const onSuccess = (res) => {
      const { id } = res.data;

      if (props.multiple) {
        uploadedFileIds.value.push(id);

        context.emit("update:value", uploadedFileIds);
        context.emit("change", uploadedFileIds);
      } else {
        uploadedFileId.value = id;

        context.emit("update:value", uploadedFileId);
        context.emit("change", uploadedFileId);
      }
    };

    const onDelete = (index) => {
      if (props.multiple) {
        uploadedFileIds.value.splice(index, 1);

        context.emit("update:value", uploadedFileIds);
        context.emit("change", uploadedFileIds);
      } else {
        uploadedFileId.value = undefined;

        context.emit("update:value", undefined);
        context.emit("change", undefined);
      }
    };

    return {
      getRequestHeaders,
      getImageUrl,
      uploadedFileId,
      uploadedFileIds,
      onSuccess,
      onDelete,
    };
  },
};
