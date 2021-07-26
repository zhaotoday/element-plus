import { store } from "@/store";

export default {
  path: "/logout",
  async beforeEnter(to, from, next) {
    if (store.state.auth.user.token) {
      await store.dispatch("auth/logout");
    }
    next("/login");
  },
};
