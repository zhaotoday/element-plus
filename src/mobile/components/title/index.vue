<template>
  <div class="c-title">
    <h2 class="c-title__title fs34">{{ title }}</h2>
    <div
      v-if="showChange"
      class="c-title__change c43 fs28"
      @click="$emit('change')"
    >
      换一换
    </div>
    <div v-if="showMore" class="c-title__more c43 fs28" @click="$emit('more')">
      更多
      <i class="c-iconfont c-iconfont--more fs24"></i>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
