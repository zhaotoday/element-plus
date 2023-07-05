import { defineStore } from "pinia/dist/pinia.cjs";
import { ref } from "vue";
import { publicEnumsApi } from "element-plus-admin/apis/public/enums";

export const useEnumsStore = defineStore(
  "enums",
  () => {
    const data = ref({
      config: {
        version: "",
      },
    });

    const get = async () => {
      data.value = await publicEnumsApi.get({});
    };

    return {
      data,
      get,
    };
  },
  { persist: true }
);
