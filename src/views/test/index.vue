<template>
  <div></div>
</template>

<script>
import { publicEnumsApi } from "element-plus-admin/apis/public/enums";
import { onMounted } from "vue";

export default {
  setup() {
    onMounted(async () => {
      console.log(
        222,
        await publicEnumsApi.post({
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
