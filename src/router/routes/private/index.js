import { adsRoute } from "./ads";
import { appUpgradesRoute } from "./app-upgrades";
import { categoriesRoute } from "./categories";
import { homeRoute } from "./home";
import { ordersRoute } from "./orders";
import { productsRoute } from "./products";
import { usersRoute } from "./users";

import { articlesRoute } from "@/router/routes/private/articles";
import { contentRoute } from "@/router/routes/private/contents";
import { teamMembersRoute } from "@/router/routes/private/team-members";

export const privateRoutes = [
  adsRoute,
  appUpgradesRoute,
  categoriesRoute,
  homeRoute,
  ordersRoute,
  productsRoute,
  usersRoute,

  articlesRoute,
  contentRoute,
  teamMembersRoute,
];
