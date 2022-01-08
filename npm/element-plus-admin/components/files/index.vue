<template>
  <ul :class="className">
    <li
      v-for="(file, index) in files"
      :key="file.id"
      @click="fileViewer.preview(file, index)"
    >
      {{ file.name }}
    </li>
  </ul>
  <teleport to="body">
    <c-file-viewer
      ref="fileViewer"
      :urls="(ids || []).map((id) => getFileUrl({ id }))"
      :office-viewer-service-url="officeViewerServiceUrl"
    />
  </teleport>
</template>

<script src="./script.js"></script>
