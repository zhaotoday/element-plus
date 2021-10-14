<template>
  <el-dialog
    custom-class="c-office-view"
    title="预览"
    v-model="cDialog.visible"
    width="900px"
  >
    <div v-if="!cDialog.src" class="c-office-view__iframe"></div>
    <iframe
      v-else
      class="c-office-view__iframe"
      :src="`https://view.officeapps.live.com/op/view.aspx?src=${cDialog.src}`"
      frameborder="0"
    ></iframe>
  </el-dialog>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
