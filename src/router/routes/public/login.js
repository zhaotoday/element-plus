import { loggedIn } from "element-plus-admin/utils/auth";

export default {
  path: "/login",
  component: () => import("@/views/login/index.vue"),
  beforeEnter(to, from, next) {
    if (loggedIn()) {
      next("/");
    } else {
      next();
    }
  },
};
