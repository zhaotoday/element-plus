import Vue from "vue";
import Router from "vue-router";
import auth from "view-ui-admin/src/utils/auth";
import TheLayout from "@/components/layout";
import Root from "@/views/root";
import ViewUI from "view-design";
import publicRoutes from "./routes/public";
import adminRoutes from "./routes/admin";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: Root,
      children: [
        {
          path: "/",
          component: TheLayout,
          children: adminRoutes,
          meta: {
            requiresAuth: true
          }
        },
        ...publicRoutes,
        {
          path: "*",
          component: resolve => require(["@/views/not-found"], resolve)
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      auth.logout();
      next({
        path: "login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  ViewUI.LoadingBar.finish();
});

export default router;
