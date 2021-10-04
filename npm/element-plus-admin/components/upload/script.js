import { reactive, ref, watch } from "vue";
import { useConsts } from "@/composables/use-consts";
import { useAuth } from "element-plus-admin/composables/use-auth";
import { FilesApi } from "@/apis/admin/files";

const { ApiUrl } = useConsts();

export default {
  props: {
    action: {
      type: String,
      default: `${ApiUrl}/admin/files/actions/upload`,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 0,
    },
    tip: {
      type: String,
      default: "",
    },
  },
  emits: ["update:value", "change"],
  setup(props, context) {
    const { getRequestHeaders } = useAuth();

    const upload = ref(null);

    const defaultFileList = ref([]);

    const uploadedFileId = ref(0);

    const cImageViewer = reactive({
      visible: false,
    });

    watch(
      () => props.value,
      async (newVal) => {
        if (newVal) {
          const { name } = await new FilesApi().get({ id: newVal });

          defaultFileList.value = [
            {
              id: newVal,
              name,
              url: `${ApiUrl}/public/files/${newVal}`,
            },
          ];
          uploadedFileId.value = newVal;
        } else {
          defaultFileList.value = [];
          uploadedFileId.value = 0;
        }
      },
      { immediate: true }
    );

    const onBeforeUpload = () => {
      upload.value.clearFiles();
    };

    const onSuccess = (res) => {
      const id = res.data.id;

      uploadedFileId.value = id;
      context.emit("update:value", id);
      context.emit("change", id);
    };

    const onRemove = () => {
      uploadedFileId.value = 0;
      context.emit("update:value", undefined);
      context.emit("change", undefined);
    };

    const onPreview = () => {
      cImageViewer.visible = true;
    };

    return {
      getRequestHeaders,
      upload,
      defaultFileList,
      uploadedFileId,
      cImageViewer,
      onBeforeUpload,
      onSuccess,
      onRemove,
      onPreview,
    };
  },
};
