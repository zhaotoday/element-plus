<template>
  <Upload
    ref="upload"
    :multiple="multiple"
    :format="format"
    :max-size="maxSize"
    :default-file-list="defaultFileList"
    :headers="$auth.getHeaders()"
    :action="`${$consts.ApiUrl}/files/actions/upload`"
    :on-format-error="handleFormatError"
    :on-exceeded-size="handleMaxSize"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
  >
    <Button icon="ios-cloud-upload-outline">请选择文件</Button>
  </Upload>
</template>

<script>
import { Vue, Component, Watch } from "vue-property-decorator";
import FilesModel from "@/models/admin/files";

const DefaultFormat = ["jpg", "jpeg", "png", "gif"];
const DefaultMaxSize = 2048;

@Component({
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    format: {
      type: Array,
      default() {
        return DefaultFormat;
      }
    },
    maxSize: {
      type: Number,
      default: DefaultMaxSize
    },
    defaultFileIds: {
      type: [Array, String],
      default: () => []
    }
  }
})
export default class Uploader extends Vue {
  defaultFileList = [];

  fileList = [];

  @Watch("defaultFileIds", { deep: true, immediate: true })
  async onDefaultFileIdsChange(newVal, oldVal) {
    if ((!oldVal || !oldVal[0]) && newVal[0]) {
      const {
        data: { items }
      } = await this.getFilesList();

      this.defaultFileList = items.map(item => this.getFile(item));
      this.fileList = this.$helpers.deepCopy(this.defaultFileList);
      this.$emit("change", this.getIds());
    }
  }

  getIds() {
    const ids = this.fileList.map(item => item.id);

    return this.multiple ? ids : ids.join(",");
  }

  getFile(data) {
    return {
      id: data.id,
      name: data.name,
      url: this.$helpers.getFileUrlById(data.id)
    };
  }

  getFilesList() {
    return new FilesModel().GET({
      query: {
        where: {
          id: this.multiple
            ? { $in: this.defaultFileIds }
            : { $eq: this.defaultFileIds }
        }
      }
    });
  }

  handleFormatError(file) {
    this.$Message.error(`文件 [${file.name}] 格式错误`);
  }

  handleMaxSize(file) {
    this.$Message.error(`文件 [${file.name}] 不能大于 ${this.maxSize / 1024}M`);
  }

  handleRemove(file) {
    const fileList = this.$refs.upload.fileList;

    this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    this.fileList.splice(this.fileList.indexOf(file), 1);

    this.$emit("change", this.getIds());
  }

  handleSuccess({ data }) {
    const file = this.getFile(data);
    const fileList = this.$refs.upload.fileList;

    if (this.multiple) {
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.fileList.push(file);
    } else {
      this.$refs.upload.fileList = [file];
      this.fileList = [file];
    }

    this.$emit("change", this.getIds());
  }
}
</script>
