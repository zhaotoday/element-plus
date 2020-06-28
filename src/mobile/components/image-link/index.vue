<template>
  <div class="c-image-link bgc11 u-tac">
    <a v-if="imageId" :href="link">
      <img
        :src="getImageUrl({ id: imageId })"
        :style="{ maxWidth: `${maxWidth}%` }"
      />
    </a>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
