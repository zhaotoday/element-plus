<template>
  <div class="v-home">{{ enums }}</div>
</template>
<script>
import { useEnums } from "element-plus-admin/composables/use-enums";

export default {
  setup() {
    const { enums } = useEnums();
    return { enums };
  },
};
</script>
