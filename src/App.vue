<template>
  <router-view />
</template>

<script>
import { useStore } from "vuex";
import { onMounted } from "vue";

export default {
  setup() {
    const { dispatch } = useStore();

    onMounted(async () => {
      await dispatch("enums/get");
    });
  },
};
</script>
