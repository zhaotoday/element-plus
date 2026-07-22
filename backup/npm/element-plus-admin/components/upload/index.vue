<template>
  <el-upload
    class="c-upload"
    ref="upload"
    :action="action"
    :headers="headers"
    :data="data"
    :show-file-list="false"
    :before-upload="beforeUpload"
    :on-success="onSuccess"
    :on-error="onError"
    :disabled="cUpload.progress !== 0 && cUpload.progress !== 100"
  >
    <el-button :class="buttonClass" :size="buttonSize" type="primary">
      {{ placeholder }}
    </el-button>
    <template #tip>
      <div v-if="tip" class="c-upload__tip fs12 t-info">{{ tip }}</div>
      <el-progress
        v-if="cUpload.progress !== 0 && cUpload.progress !== 100"
        class="c-upload__progress"
        :percentage="cUpload.progress"
      />
      <cc-files
        v-show="showUploaded"
        :ids="multiple ? value : value ? [value] : []"
        :office-viewer-service-url="officeViewerServiceUrl"
        @delete="onDelete"
      />
    </template>
  </el-upload>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
