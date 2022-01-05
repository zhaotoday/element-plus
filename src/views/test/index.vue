<template>
  <div></div>
</template>

<script>
import { enumsApi } from "element-plus-admin/apis/public/enums";
import { onMounted } from "vue";

export default {
  setup() {
    onMounted(async () => {
      console.log(
        222,
        await enumsApi.post({
          action: "getVersion",
          query: { cc: 33 },
          body: {
            dd: 33,
          },
        })
      );
    });
  },
};
</script>
