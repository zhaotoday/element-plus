<template>
  <el-upload
    class="c-upload"
    ref="upload"
    :action="action"
    :headers="getRequestHeaders()"
    :multiple="multiple"
    :file-list="defaultFileList"
    :before-upload="onBeforeUpload"
    :on-success="onSuccess"
    :on-preview="onPreview"
    :on-remove="onRemove"
  >
    <el-button size="small" type="primary">请选择文件</el-button>
    <template #tip>
      <div v-if="tip" class="c-upload__tip fs12 t-info">{{ tip }}</div>
    </template>
  </el-upload>
  <el-image-viewer
    v-if="cImageViewer.visible"
    :url-list="[`${$consts.ApiUrl}/public/files/${uploadedFileId}`]"
    @close="cImageViewer.visible = false"
  />
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
