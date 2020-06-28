<template>
  <div class="c-popup">
    <div v-show="visible" class="c-overlay" @click="$emit('close')"></div>
    <div v-show="visible">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script src="./script.js"></script>
