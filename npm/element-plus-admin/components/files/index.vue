<template>
  <ul :class="className">
    <li
      v-for="(file, index) in files"
      :key="file.id"
      @click="preview(file, index)"
    >
      <a class="el-upload-list__item-name">
        <i class="el-icon-document"></i>
        {{ file.name }}
      </a>
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
