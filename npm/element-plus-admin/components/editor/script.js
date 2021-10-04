import { onMounted, ref } from "vue";
import WangEditor from "wangeditor";
import { useConsts } from "@/composables/use-consts";
import { useAuth } from "element-plus-admin/composables/use-auth";
import { sleep } from "jt-helpers";

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  emits: ["update:value", "change"],
  setup(props, context) {
    let editor = null;

    const { ApiUrl } = useConsts();
    const { getRequestHeaders } = useAuth();

    const editorToolbar = ref(null);
    const editorText = ref(null);

    onMounted(async () => {
      editor = new WangEditor(editorToolbar.value, editorText.value);

      editor.config.menus = [
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

      editor.config.uploadImgServer = `${ApiUrl}/admin/files/actions/upload`;

      editor.config.uploadImgHeaders = getRequestHeaders();

      editor.config.uploadFileName = "file";

      editor.config.uploadImgHooks = {
        customInsert: (insertImg, result) => {
          insertImg(`${ApiUrl}/public/files/${result.data.id}`);
        },
      };

      editor.create();

      editor.txt.html(props.value);

      // 不监听第一次 onchange 事件
      await sleep(10);

      editor.config.onchange = (html) => {
        context.emit("update:value", html);
        context.emit("change", html);
      };
    });

    return {
      editorToolbar,
      editorText,
    };
  },
};
