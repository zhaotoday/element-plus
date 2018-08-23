<template>
  <div>
    <Upload
      ref="upload"
      :default-file-list="defaultFileList"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="format"
      :max-size="maxSize"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleExceededSize"
      :headers="headers"
      :action="`${consts.API_URL}/files`">
      <Button
        type="ghost"
        icon="ios-cloud-upload-outline"
        style="width: 220px;"
      >
        上传文件
      </Button>
    </Upload>
    <div
      class="demo-upload-list"
      v-for="item in uploadList"
    >
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon
            type="ios-trash-outline"
            @click.native="handleRemove(item)"
          />
        </div>
      </template>
      <template v-else>
        <Progress
          v-if="item.showProgress"
          :percent="item.percentage"
          hide-info
        />
      </template>
    </div>
  </div>
</template>
<script>
  import consts from '@/utils/consts'
  import helpers from '@/utils/helpers/base'
  import restHelpers from '@/utils/helpers/restHelpers'

  export default {
    name: 'CChildUploader',
    props: {
      value: {
        type: [String, Number],
        default: 0
      },
      format: {
        type: Array,
        default () {
          return ['jpg', 'jpeg', 'png']
        }
      },
      maxSize: {
        type: Number,
        default: 2048
      }
    },
    data () {
      return {
        consts,
        uploadList: []
      }
    },
    computed: {
      headers () {
        return restHelpers.getHeaders()
      },
      defaultFileList () {
        return this.value ? [{
          'name': '',
          'url': helpers.getImageURLById(this.value)
        }] : []
      }
    },
    methods: {
      remove (file) {
        const fileList = this.$refs.upload.fileList

        if (file) {
          this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
        } else {
          this.$refs.upload.fileList.splice(0, fileList.length)
        }
      },
      handleRemove (file) {
        this.remove(file)
        this.$emit('change', null)
      },
      handleSuccess (res, file) {
        file.url = helpers.getImageURLById(res.data.id)
        file.name = res.data.title

        if (this.uploadList.length > 1) {
          this.remove(this.uploadList[0])
        }

        this.$emit('change', res.data)
      },
      handleFormatError () {
        this.$Message.error('文件格式不正确')
      },
      handleExceededSize () {
        this.$Message.error(`文件不能超过 ${this.maxSize / 1024}M`)
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    }
  }
</script>

<style src="./styles/index.scss">
</style>
