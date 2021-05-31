import { loggedIn, logout } from "element-plus-admin/utils/auth";

export default {
  path: "/logout",
  beforeEnter(to, from, next) {
    loggedIn() && logout();
    next("/login");
  },
};
