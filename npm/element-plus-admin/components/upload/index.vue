<template>
  <el-upload
    class="c-upload"
    ref="upload"
    :action="action"
    :headers="getRequestHeaders()"
    :multiple="multiple"
    :show-file-list="false"
    :on-success="onSuccess"
  >
    <el-button size="small" type="primary">{{ placeholder }}</el-button>
    <template #tip>
      <div v-if="tip" class="c-upload__tip fs12 t-info">{{ tip }}</div>
      <cc-files
        :ids="
          multiple ? uploadedFileIds : uploadedFileId ? [uploadedFileId] : []
        "
        @delete="onDelete"
      />
    </template>
  </el-upload>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
