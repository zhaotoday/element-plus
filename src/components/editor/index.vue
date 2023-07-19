<template>
  <div style="border: 1px solid #ccc">
    <toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      mode="default"
    />
    <editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :default-config="editorConfig"
      mode="default"
      @on-created="onCreated"
    />
  </div>
</template>

<script src="./script.js"></script>
