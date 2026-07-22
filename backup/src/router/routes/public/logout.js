import { store } from "@/store";
import { RouterView } from "vue-router";

export const logoutRoute = {
  path: "/logout",
  component: <RouterView />,
  async beforeEnter(to, from, next) {
    if (store.state.auth.user.token) {
      await store.dispatch("auth/logout");
    }
    next("/login");
  },
};
