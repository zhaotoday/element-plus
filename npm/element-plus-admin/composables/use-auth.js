import { computed } from "vue";
import { useStore } from "vuex";

export const useAuth = () => {
  const { dispatch, state } = useStore();
  const user = computed(() => state.auth.user);
  const menus = computed(() => state.auth.menus);

  const getRequestHeaders = () => {
    return { Authorization: `Bearer ${user.value.token}` };
  };

  const loggedIn = () => !!user.value.token;

  const login = (options) => dispatch("auth/login", options);

  const logout = () => dispatch("auth/logout");

  return {
    user,
    menus,
    getRequestHeaders,
    loggedIn,
    login,
    logout,
  };
};
