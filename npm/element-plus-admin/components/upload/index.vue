<template>
  <el-upload
    class="c-upload"
    ref="upload"
    :action="action"
    :headers="headers || getRequestHeaders()"
    :data="data"
    :multiple="multiple"
    :show-file-list="false"
    :on-success="onSuccess"
    :on-error="onError"
  >
    <el-button :class="buttonClass" :size="buttonSize" type="primary">
      {{ placeholder }}
    </el-button>
    <template #tip>
      <div v-if="tip" class="c-upload__tip fs12 t-info">{{ tip }}</div>
      <cc-files
        v-show="showUploaded"
        :ids="multiple ? value : value ? [value] : []"
        @delete="onDelete"
      />
    </template>
  </el-upload>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
