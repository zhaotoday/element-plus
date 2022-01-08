<template>
  <el-dialog
    custom-class="c-video-viewer"
    title="预览"
    v-model="cDialog.visible"
    width="950px"
  >
    <div v-if="!cDialog.src" class="c-video-viewer__iframe"></div>
    <video class="c-video-viewer__video" :src="cDialog.src" controls="controls">
      您的浏览器不支持 video 标签。
    </video>
  </el-dialog>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
