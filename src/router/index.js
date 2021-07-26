import { createRouter, createWebHashHistory } from "vue-router";
import publicRoutes from "./routes/public";
import privateRoutes from "./routes/private";
import { store } from "@/store";

const routes = [
  {
    path: "/",
    component: () => import("@/components/layout/index.vue"),
    children: privateRoutes,
    meta: {
      requiresAuth: true,
    },
  },
  ...publicRoutes,
  {
    path: "/:matchOthers(.*)*",
    component: () => import("@/views/404/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth.user.token) {
      await store.dispatch("auth/logout");

      next({
        path: "login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export { router };
