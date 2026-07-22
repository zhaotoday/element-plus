import { computed } from "vue";
import { store } from "@/store";

export const useAuth = () => {
  const { dispatch, state } = store;

  const user = computed(() => state.auth.user);

  const menus = computed(() => state.auth.menus);

  const getHeaders = () => {
    return { Authorization: `Bearer ${user.value.token}` };
  };

  const loggedIn = () => !!user.value.token;

  const login = (options) => dispatch("auth/login", options);

  const logout = () => dispatch("auth/logout");

  return {
    user,
    menus,
    getHeaders,
    loggedIn,
    login,
    logout,
  };
};
