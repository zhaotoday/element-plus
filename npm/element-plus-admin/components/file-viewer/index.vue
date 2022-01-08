<template>
  <el-image-viewer
    v-if="cImageViewer.visible"
    :url-list="ids.map((id) => getFileUrl({ id }))"
    :initial-index="cImageViewer.index"
    z-index="20000"
    @close="cImageViewer.visible = false"
  />
  <c-office-viewer ref="officeViewer" :service-url="officeViewerServiceUrl" />
</template>

<script src="./script.js"></script>
