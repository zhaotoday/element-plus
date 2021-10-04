import { onMounted, ref, watch } from "vue";
import WangEditor from "wangeditor";
import { useConsts } from "@/composables/use-consts";
import { useAuth } from "element-plus-admin/composables/use-auth";

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

    watch(
      () => props.value,
      (newVal, oldVal) => {
        if (newVal && !oldVal) {
          editor && editor.txt.html(newVal);
        }
      },
      { immediate: true }
    );

    onMounted(() => {
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

      editor.config.onchange = (html) => {
        context.emit("update:value", html);
        context.emit("change", html);
      };

      editor.create();

      editor.txt.html(props.value);
    });

    return {
      editorToolbar,
      editorText,
    };
  },
};
