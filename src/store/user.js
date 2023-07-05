import { defineStore } from "pinia/dist/pinia.cjs";
import { publicManagersApi } from "element-plus-admin/apis/public/managers";
import { reactive, ref } from "vue";
import { stat } from "@babel/core/lib/gensync-utils/fs";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref({});
    const token = ref("");

    const login = async (data) => {
      const res = await publicManagersApi.post({ action: "login", body: data });

      user.value = { id: res.manager.id, name: res.manager.username };
      token.value = res.token;
    };

    return {
      login,
    };
  },
  {
    persist: true,
  }
);
