<template>
  <div>
    <c-child-uploader
      key="0"
      v-if="hasDefaultFile && !value"
      ref="uploader"
      :max-size="maxSize"
      :preview-icon="previewIcon"
      :format="format"
      @change="handleUploaderChange"
    />
    <c-child-uploader
      key="1"
      v-if="hasDefaultFile && value"
      ref="uploader"
      :value="value"
      :max-size="maxSize"
      :preview-icon="previewIcon"
      :format="format"
      @change="handleUploaderChange"
    />
    <c-child-uploader
      key="2"
      v-if="!hasDefaultFile"
      ref="uploader"
      :max-size="maxSize"
      :preview-icon="previewIcon"
      :format="format"
      @change="handleUploaderChange"
    />
    <Input :value="value" style="display: none;" />
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import CChildUploader from "./components/uploader";

@Component({
  components: {
    CChildUploader
  },
  props: {
    hasDefaultFile: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: 0
    },
    format: {
      type: Array,
      default() {
        return ["jpg", "jpeg", "png"];
      }
    },
    previewIcon: {
      type: String,
      default: ""
    },
    maxSize: {
      type: Number,
      default: 2048
    }
  }
})
export default class Uploader extends Vue {
  handleUploaderChange(file) {
    this.$emit("change", file);
  }

  remove() {
    this.$refs.uploader.remove();
  }
}
</script>
