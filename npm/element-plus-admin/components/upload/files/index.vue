<template>
  <ul class="cc-files">
    <li
      v-for="(file, index) in files"
      :key="file.id"
      class="cc-files__item"
      tabindex="0"
      @click="fileViewer.preview(file, index)"
    >
      <el-icon class="cc-files__icon">
        <el-icon-document />
      </el-icon>
      <div class="cc-files__name">{{ file.name }}</div>
      <el-icon class="cc-files__status el-icon--check">
        <el-circle-check />
      </el-icon>
      <el-icon
        class="cc-files__close el-icon--close"
        @click.stop="$emit('delete', index)"
      >
        <el-close />
      </el-icon>
    </li>
  </ul>
  <teleport to="body">
    <c-file-viewer
      ref="fileViewer"
      :urls="ids.map((id) => getFileUrl({ id }))"
      :office-viewer-service-url="officeViewerServiceUrl"
    />
  </teleport>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
