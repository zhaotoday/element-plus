import { defineStore } from "pinia/dist/pinia.cjs";
import { publicManagersApi } from "element-plus-admin/apis/public/managers";
import { ref } from "vue";

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

    const logout = () => {
      user.value = {};
      token.value = "";
    };

    return {
      user,
      token,
      login,
      logout,
    };
  },
  {
    persist: true,
  }
);
