<template>
  <div class="c-editor">
    <div id="editor-toolbar" class="c-editor__toolbar"></div>
    <div id="editor-text" class="c-editor__text"></div>
  </div>
</template>

<script>
import { Vue, Component, Watch } from "vue-property-decorator";
import WangEditor from "wangeditor";

@Component({
  props: {
    html: {
      type: String,
      default: ""
    }
  }
})
export default class Editor extends Vue {
  @Watch("html")
  onHtmlChange(newVal) {
    if (newVal) {
      this.editor.txt.html(newVal);
    }
  }

  mounted() {
    this.editor = new WangEditor("#editor-toolbar", "#editor-text");

    this.editor.customConfig.menus = [
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
      "video",
      "table",
      "undo",
      "redo"
    ];

    this.editor.customConfig.uploadImgServer = `${this.$consts.API_URL}/files/actions/upload`;

    this.editor.customConfig.uploadImgHeaders = this.$auth.getHeaders();

    this.editor.customConfig.uploadFileName = "file";

    this.editor.customConfig.uploadImgHooks = {
      customInsert: (insertImg, result) => {
        const url = this.$helpers.getFileURLById(result.data.id);
        insertImg(url);
      }
    };

    this.editor.customConfig.onchange = html => {
      this.$emit("change", html);
    };

    this.editor.create();
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
