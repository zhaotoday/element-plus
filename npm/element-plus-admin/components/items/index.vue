<template>
  <ul :class="className">
    <li
      v-for="(item, index) in items"
      :key="item.id"
      @click="$emit('click', { item, index })"
    >
      {{ item[labelKey] }}
    </li>
  </ul>
</template>

<script src="./script.js"></script>
