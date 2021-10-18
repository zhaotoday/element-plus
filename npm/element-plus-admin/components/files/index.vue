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
  <teleport to="body">
    <el-image-viewer
      v-if="cImageViewer.visible"
      :url-list="ids.map((id) => getFileUrl({ id }))"
      :initial-index="cImageViewer.index"
      z-index="20000"
      @close="cImageViewer.visible = false"
    />
    <c-office-view ref="officeView" />
  </teleport>
</template>

<script src="./script.js"></script>
