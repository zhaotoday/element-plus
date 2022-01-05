import { onMounted, ref, watch } from "vue";
import WangEditor from "wangeditor";
import { useConsts } from "@/composables/use-consts";
import { useAuth } from "element-plus-admin/composables/use-auth";
import { sleep } from "jt-helpers";
import { useUploadImage } from "./composables/use-upload-image";

const { ApiUrl } = useConsts();
const { getHeaders } = useAuth();

export default {
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
    uploadHeaders: {
      type: Object,
      default: () => getHeaders(),
    },
    uploadAction: {
      type: String,
      default: `${ApiUrl}/admin/files/actions/upload`,
    },
    uploadTo: {
      type: String,
      default: "Server",
    },
    aliCloudOssConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:value", "change", "focus", "blur"],
  setup(props, context) {
    const uploadImage = useUploadImage(props.aliCloudOssConfig);

    let editor = null;

    const editorToolbar = ref(null);
    const editorInput = ref(null);

    watch(
      () => props.value,
      (newVal, oldVal) => {
        if (oldVal) {
          if (!newVal) editor.txt.html("");
        } else {
          if (newVal) editor.txt.html(newVal);
        }
      }
    );

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

      editor.config.uploadFileName = "file";

      await uploadImage.configEditor(editor, props);

      editor.create();

      editor.txt.html(props.value);

      // 不监听第一次 onchange 事件
      await sleep(1000);

      editor.config.onchange = (html) => {
        context.emit("update:value", html);
        context.emit("change", html);
      };

      editor.config.onblur = (newHtml) => {
        context.emit("blur", newHtml);
      };

      editor.config.onfocus = (newHtml) => {
        context.emit("focus", newHtml);
      };
    });

    return {
      editorToolbar,
      editorInput,
    };
  },
};
