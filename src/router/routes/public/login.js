import { useAuth } from "element-plus-admin/composables/use-auth";

export default {
  path: "/login",
  component: () => import("@/views/login/index.vue"),
  beforeEnter(to, from, next) {
    if (useAuth().loggedIn()) {
      next("/");
    } else {
      next();
    }
  },
};
