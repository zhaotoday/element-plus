<template>
  <ul class="el-upload-list el-upload-list--text">
    <li
      v-for="(file, index) in files"
      :key="file.id"
      class="el-upload-list__item is-success"
      tabindex="0"
      @click="preview(file, index)"
    >
      <a class="el-upload-list__item-name">
        <i class="el-icon-document"></i>
        {{ file.name }}
      </a>
      <label class="el-upload-list__item-status-label">
        <i class="el-icon-upload-success el-icon-circle-check"></i>
      </label>
      <i class="el-icon-close" @click.stop="$emit('delete', index)"></i>
    </li>
  </ul>
  <el-image-viewer
    v-if="cImageViewer.visible"
    :url-list="ids.map((id) => getFileUrl({ id }))"
    :initial-index="cImageViewer.index"
    @close="cImageViewer.visible = false"
  />
  <c-office-view ref="officeView" />
</template>

<script src="./script.js"></script>
