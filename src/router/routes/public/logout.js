import { useAuth } from "element-plus-admin/composables/use-auth";

const { loggedIn, logout } = useAuth();

export default {
  path: "/logout",
  beforeEnter(to, from, next) {
    loggedIn() && logout();
    next("/login");
  },
};
