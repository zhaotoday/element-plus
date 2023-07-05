import { defineStore } from "pinia/dist/pinia.cjs";
import { publicManagersApi } from "element-plus-admin/apis/public/managers";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
      const user=ref({})
      const token=ref('')

    const login = async (data) => {
      const data = await publicManagersApi.post({ action: "login", body: data });

      const {
        manager: { id, username },
        token,
      } = res;

      user.value = { id: data.manager., name: username };

      return res;
    };

    return {
      state,
      login,
    };
  },
  {
    persist: true,
  }
);
