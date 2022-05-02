<template>
  <div class="b-main">
    <div class="c-container">
      <div class="b-main__icon">
        <h2 v-if="tip" class="fs22 u-lh1 u-tac t-primary">{{ tip }}</h2>
        <img src="./images/icon.png" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script src="./script.js"></script>
