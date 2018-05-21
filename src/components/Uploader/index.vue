<template>
  <div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :headers="headers"
      action="//localhost:3002/apis/v1/files">
      <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
    <Modal title="查看图片" v-model="visible">
      <img :src="imgURL" v-if="visible" style="width: 100%">
    </Modal>
    <div class="demo-upload-list" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
  </div>
</template>
<script>
  import restHelpers from '@/utils/helpers/restHelpers'

  export default {
    data () {
      return {
        defaultList: [],
        imgURL: '',
        visible: false,
        uploadList: []
      }
    },
    computed: {
      headers () {
        return restHelpers.getHeaders()
      }
    },
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    methods: {
      handleView (url) {
        this.imgURL = url
        this.visible = true
      },
      _remove (file) {
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      },
      handleRemove (file) {
        this._remove(file)
        this.$emit('on-change', null)
      },
      handleSuccess (res, file) {
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
        file.name = ''

        if (this.uploadList.length > 1) {
          this._remove(this.uploadList[0])
        }

        this.$emit('on-change', file)
      },
      handleFormatError () {
        this.$Message.error('文件格式不正确')
      },
      handleMaxSize () {
        this.$Message.error('文件不能超过 2M')
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 2
        if (!check) {
          this.$Message.error('删除已有图片后再上传')
        }
        return check
      }
    },
    created () {
      if (this.value) {
        this.defaultList.push({
          'name': '',
          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        })
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    }
  }
</script>

<style src="./styles/index.scss">
</style>
