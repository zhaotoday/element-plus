import { createApp } from "vue";
import "@/assets/styles/global/index.scss";
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";
import "element-plus/lib/theme-chalk/index.css";
import "element-plus-admin/utils/polyfills";
import { config } from "@/utils/config";
import { useComponents } from "@/utils/use-components";
import App from "./App.vue";
import { store } from "./store";
import { router } from "./router";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(ElementPlus, { size: "medium", locale })
  .mount("#app");

config(app);
useComponents(app);
