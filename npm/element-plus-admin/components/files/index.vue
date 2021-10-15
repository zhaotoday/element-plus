<template>
  <ul :class="className">
    <li
      v-for="(file, index) in files"
      :key="file.id"
      @click="preview(file, index)"
    >
      {{ file.name }}
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
