import { useAuth } from "element-plus-admin/composables/use-auth";

export default {
  path: "/logout",
  async beforeEnter(to, from, next) {
    const { loggedIn, logout } = useAuth();

    if (loggedIn()) {
      await logout();
    }
    next("/login");
  },
};
