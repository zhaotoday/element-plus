import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, ref, shallowRef, watch } from "vue";
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
  setup(props, context) {
    const editorRef = shallowRef();

    const valueHtml = ref("<p>hello</p>");

    watch(
      () => valueHtml.value,
      (newVal) => {
        console.log(valueHtml.value, "==");
        context.emit("update:value", newVal);
        //        console.log(newVal); // context.emi
      }
    );

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
