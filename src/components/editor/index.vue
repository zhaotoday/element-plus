<template>
  <div class="c-editor">
    <div id="editor-toolbar" class="c-editor__toolbar"></div>
    <div id="editor-text" class="c-editor__text"></div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
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

    this.editor.customConfig.uploadImgServer = `${this.$consts.ApiUrl}/files/actions/upload`;

    this.editor.customConfig.uploadImgHeaders = this.$auth.getHeaders();

    this.editor.customConfig.uploadFileName = "file";

    this.editor.customConfig.uploadImgHooks = {
      customInsert: (insertImg, result) => {
        const url = this.$helpers.getFileUrlById(result.data.id);
        insertImg(url);
      }
    };

    this.editor.customConfig.onchange = html => {
      this.$emit("change", html);
    };

    this.editor.create();

    this.editor.txt.html(this.html);
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
