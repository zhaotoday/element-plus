<template>
  <el-image
    :style="{ display: 'block', cursor: 'pointer', width, height }"
    :src="src"
    fit="cover"
    :preview-src-list="[src]"
    preview-teleported
    title="查看大图"
  />
</template>

<script src="./script.js"></script>
