<template>
  <div class="v-home">
    <img
      v-for="item in 4"
      :key="item"
      class="b-image"
      :src="`${$consts.BaseUrl}images/pages/home/${item}.jpg`"
    />
  </div>
</template>

<style lang="scss" src="./style.scss"></style>
