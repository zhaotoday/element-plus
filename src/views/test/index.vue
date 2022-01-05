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
        await dictsApi.post({
          config: {
            abc: 323,
          },
          data: {
            dd: 33,
          },
          action: "getVersion",
        })
      );
    });
  },
};
</script>
