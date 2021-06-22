<template>
  <router-view />
</template>

<script>
import { useEnums } from "element-plus-admin/composables/use-enums";
import { onMounted } from "vue";

export default {
  setup() {
    const { getEnums } = useEnums();

    onMounted(async () => {
      await getEnums();
    });
  },
};
</script>
