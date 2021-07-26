import { store } from "@/store";

export default {
  path: "/login",
  component: () => import("@/views/login/index.vue"),
  beforeEnter(to, from, next) {
    if (store.state.auth.user.token) {
      next("/");
    } else {
      next();
    }
  },
};
