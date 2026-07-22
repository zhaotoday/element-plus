<template>
  <template v-if="plain">
    {{ (items || []).map((item) => item[labelKey]).join(joinString) }}
  </template>
  <ul v-else :class="className">
    <li
      v-for="(item, index) in items || []"
      :key="item.id"
      @click="$emit('click', { item, index })"
    >
      {{ item[labelKey] }}
    </li>
  </ul>
</template>

<script src="./script.js"></script>
