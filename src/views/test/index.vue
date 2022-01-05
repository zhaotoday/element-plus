<template>
  <div></div>
</template>

<script>
import { dictsApi } from "@/apis/public/dicts";
import { onMounted } from "vue";

export default {
  setup() {
    onMounted(async () => {
      console.log(
        222,
        await dictsApi.post({
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
