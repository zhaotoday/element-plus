import { store } from "@/store";

export const loginRoute={
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
