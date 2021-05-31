import { onMounted, watch } from "vue";
import WangEditor from "wangeditor";
import { getFileName } from "@/components/upload/utils/file";
import * as qiniu from "qiniu-js";
import { ManagerModel } from "@/models/manager";
import { consts } from "@/utils/consts";

export default {
  name: "Editor",
  props: {
    html: {
      type: String,
      default: ""
    }
  },
  emits: ["change"],
  setup(props, context) {
    let editor = null;

    watch(
      () => props.html,
      (newValue, oldValue) => {
        if (newValue && !oldValue) {
          editor && editor.txt.html(newValue);
        }
      }
    );

    onMounted(() => {
      editor = new WangEditor("#editorToolbar", "#editorText");

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
        "table"
      ];

      editor.config.zIndex = 0;

      editor.config.uploadImgMaxLength = 1;

      editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
        const fileName = await getFileName(resultFiles[0]);
        const config = {
          useCdnDomain: true,
          region: qiniu.region.z2
        };
        const putExtra = {
          fname: fileName,
          params: {},
          mimeType: null
        };

        const token = await new ManagerModel().addPath("qiniu/token").GET({});

        qiniu
          .upload(resultFiles[0], fileName, token, putExtra, config)
          .subscribe({
            complete(res) {
              insertImgFn(`${consts.StaticUrl}/${res.key}`);
            }
          });
      };

      editor.config.onchange = html => {
        context.emit("change", html);
      };

      editor.create();

      editor.txt.html(props.html);
    });

    return {};
  }
};
