<template>
  <div class="v-home">
    欢迎使用后台管理系统！
    <editor v-model:value="value" />
    {{ value }}
  </div>
</template>

<script>
import Editor from "@/components/editor";
import { ref } from "vue";

export default {
  components: {
    Editor,
  },
  setup() {
    const value = ref("");

    let i = 0;

    setInterval(() => {
      value.value = i++ + "";
    }, 1000);

    return {
      value,
    };
  },
};
</script>
