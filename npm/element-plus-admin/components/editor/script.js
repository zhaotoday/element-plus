import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, ref, shallowRef, watch } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { useConsts } from "@/composables/use-consts";
import { useAuth } from "element-plus-admin/composables/use-auth";
import { useUpload } from "./composables/use-upload";

const { ApiUrl } = useConsts();
const { getHeaders } = useAuth();

export default {
  components: { Editor, Toolbar },
  props: {
    value: {
      type: String,
      default: "",
    },
    style: {
      type: String,
      default: "height: 500px",
    },
    uploadAction: {
      type: String,
      default: `${ApiUrl}/admin/files/actions/upload`,
    },
    uploadHeaders: {
      type: Object,
      default: () => getHeaders(),
    },
    cosConfig: {
      type: Object,
      default: () => null,
    },
  },
  emits: ["update:value"],
  setup(props, context) {
    const upload = useUpload({ props });

    const editorRef = shallowRef();

    const valueHtml = ref(props.value);

    watch(
      () => props.value,
      (newVal) => {
        valueHtml.value = newVal;
      }
    );

    watch(
      () => valueHtml.value,
      (newVal) => {
        context.emit("update:value", newVal);
      }
    );

    const toolbarConfig = {};

    const editorConfig = {
      MENU_CONF: {},
      placeholder: "请输入内容...",
    };

    upload.configEditor({ editorConfig });

    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const onCreated = (editor) => {
      editorRef.value = editor;
    };

    return {
      editorRef,
      valueHtml,
      toolbarConfig,
      editorConfig,
      onCreated,
    };
  },
};
