import { loggedIn } from "@/utils/auth";

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
