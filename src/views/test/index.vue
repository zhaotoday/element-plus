<template>
  <div></div>
</template>

<script>
import request from "@/utils/request";
import { onMounted } from "vue";

export default {
  setup() {
    // action: "http://127.0.0.1:3101/public/dicts/actions/getVersion",

    onMounted(async () => {
      console.log(
        await request.post({
          baseUrl: "http://127.0.0.1:8080",
          url: "/public/dicts/actions/getVersion",
        })
      );
    });
  },
};
</script>
