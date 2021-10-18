<template>
  <ul :class="className">
    <li
      v-for="(item, index) in items"
      :key="item.id"
      @click="$emit({ item, index })"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script src="./script.js"></script>
