<template>
  <ul class="c-shortcuts bgc21 c11 fs28">
    <li
      v-for="item in items"
      :key="item.id"
      class="c-shortcuts__item u-tac"
      @click="goLink(item)"
    >
      <span class="c-shortcuts__title fs28">
        {{ item.name }}
      </span>
    </li>
  </ul>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
