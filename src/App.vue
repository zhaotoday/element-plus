<template>
  <router-view />
</template>

<script>
import { onMounted } from "vue";
import { useEnums } from "element-plus-admin/composables/use-enums";

export default {
  setup() {
    const { getEnums } = useEnums();

    onMounted(async () => {
      await getEnums();
    });
  },
};
</script>
