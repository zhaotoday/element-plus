<template>
  <ul class="cc-files">
    <li
      v-for="(file, index) in files"
      :key="file.id"
      class="cc-file__item"
      tabindex="0"
      @click="preview(file, index)"
    >
      <el-icon class="cc-files__icon">
        <el-icon-document />
      </el-icon>
      <div class="cc-files__name">{{ file.name }}</div>
      <el-icon class="el-icon--check el-icon--upload-success">
        <el-circle-check />
      </el-icon>
      <el-icon class="el-icon--close" @click.stop="$emit('delete', index)">
        <el-close />
      </el-icon>
    </li>
  </ul>
  <teleport to="body">
    <el-image-viewer
      v-if="cImageViewer.visible"
      :url-list="ids.map((id) => getFileUrl({ id }))"
      :initial-index="cImageViewer.index"
      z-index="20000"
      @close="cImageViewer.visible = false"
    />
    <c-office-viewer ref="officeViewer" :service-url="officeViewerServiceUrl" />
  </teleport>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
