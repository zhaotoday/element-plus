import { loggedIn } from "@/utils/auth";

export default {
  path: "/login",
  component: () => import("@/views/login"),
  beforeEnter(to, from, next) {
    if (loggedIn()) {
      next("/");
    } else {
      next();
    }
  }
};
