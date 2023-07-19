import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, ref, shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { useConsts } from "@/composables/use-consts";
import { useAuth } from "element-plus-admin/composables/use-auth";

const { ApiUrl } = useConsts();
const { getHeaders } = useAuth();

export default {
  components: { Editor, Toolbar },
  props: {
    value: {
      type: String,
      default: "",
    },
    menus: {
      type: Array,
      default: () => null,
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
  emits: ["update:value", "change", "focus", "blur"],
  setup(props) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref("<p>hello</p>");

    const toolbarConfig = {};

    const editorConfig = {
      MENU_CONF: {},
      placeholder: "请输入内容...",
    };

    editorConfig.MENU_CONF["uploadImage"] = {
      server: props.uploadAction,
      fieldName: "file",
      maxNumberOfFiles: 1,
      headers: props.uploadHeaders,
      customInsert(res, insertFn) {
        insertFn(`${ApiUrl}/public/files/${res.data.id}`);
      },
    };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const onCreated = (editor) => {
      // 记录 editor 实例，重要！
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
