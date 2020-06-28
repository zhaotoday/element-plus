import auth from 'view-ui-admin/src/utils/auth'

export default {
  path: "wx-login",
  component: resolve => require(["@/views/wx-login"], resolve),
  beforeEnter(to, from, next) {
    if (auth.loggedIn()) {
      next("/");
    } else {
      next();
    }
  }
};
