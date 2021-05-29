import { loggedIn, logout } from "@/utils/auth";

export default {
  path: "/logout",
  beforeEnter(to, from, next) {
    loggedIn() && logout();
    next("/login");
  }
};
