import Vue from "vue";
import Router from "vue-router";
import auth from "@/utils/auth";
import TheLayout from "@/components/layout";
import Root from "@/views/root";
import ViewUI from "view-design";

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
          children: [
            require("./routes/home").default,
            require("./routes/wx-users").default,
            require("./routes/products").default,
            require("./routes/ads").default,
            require("./routes/orders").default,
            require("./routes/articles").default,
            require("./routes/merchants").default,
            require("./routes/coupons").default,
            require("./routes/entries").default,
            require("./routes/schools").default,
            require("./routes/brands").default,
            require("./routes/dresses").default,
            require("./routes/reports").default,
            require("./routes/notices").default,
            require("./routes/withdraws").default,
            require("./routes/commissions").default,
            require("./routes/points").default,
            require("./routes/shortcuts").default,
            require("./routes/distributor-applications").default,
            require("./routes/outer-products").default,
            require("./routes/school-wx-users").default,
            require("./routes/settings").default,
            require("./routes/incomes").default,
            require("./routes/all-incomes").default
          ],
          meta: {
            requiresAuth: true
          }
        },
        require("./routes/login").default,
        require("./routes/wx-login").default,
        require("./routes/logout").default,
        require("./routes/not-found").default
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
