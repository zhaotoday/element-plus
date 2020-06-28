import auth from "@/utils/auth";

export default {
  path: "logout",
  beforeEnter(to, from, next) {
    if (auth.loggedIn()) {
      auth.logout();
    }

    next("/login");
  }
};
