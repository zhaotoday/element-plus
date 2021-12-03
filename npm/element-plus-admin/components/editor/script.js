import { onMounted, ref } from "vue";
import WangEditor from "wangeditor";
import { useConsts } from "@/composables/use-consts";
import { useAuth } from "element-plus-admin/composables/use-auth";
import { sleep } from "jt-helpers";

const { ApiUrl } = useConsts();
const { getRequestHeaders } = useAuth();

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "500px",
    },
    menus: {
      type: Array,
      default: () => null,
    },
    uploadHeaders: {
      type: Object,
      default: () => getRequestHeaders(),
    },
    uploadAction: {
      type: String,
      default: `${ApiUrl}/admin/files/actions/upload`,
    },
  },
  emits: ["update:value", "change"],
  setup(props, context) {
    let editor = null;

    const editorToolbar = ref(null);
    const editorInput = ref(null);

    onMounted(async () => {
      editor = new WangEditor(editorToolbar.value, editorInput.value);

      editor.config.menus = props.menus || [
        "head",
        "bold",
        "fontSize",
        "italic",
        "underline",
        "strikeThrough",
        "foreColor",
        "backColor",
        "link",
        "list",
        "justify",
        "quote",
        "image",
        "table",
      ];

      editor.config.zIndex = 0;

      editor.config.uploadImgMaxLength = 1;

      editor.config.uploadImgServer = props.uploadAction;

      editor.config.uploadImgHeaders = props.uploadHeaders;

      editor.config.uploadFileName = "file";

      editor.config.uploadImgHooks = {
        customInsert: (insertImg, result) => {
          insertImg(`${ApiUrl}/public/files/${result.data.id}`);
        },
      };

      editor.create();

      editor.txt.html(props.value);

      // 不监听第一次 onchange 事件
      await sleep(1000);

      editor.config.onchange = (html) => {
        context.emit("update:value", html);
        context.emit("change", html);
      };
    });

    return {
      editorToolbar,
      editorInput,
    };
  },
};
