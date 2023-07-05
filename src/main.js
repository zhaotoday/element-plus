import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "@/assets/styles/element-plus/index.scss";
import ElementPlus from "element-plus";
import "@/assets/styles/global/index.scss";
import "element-plus-admin/utils/polyfills";
import { config } from "@/utils/config";
import { useComponents } from "@/utils/use-components";
import App from "./App.vue";
import { store } from "./store";
import { router } from "./router";

const pinia = createPinia()
const app = createApp(App);

app.use(pinia).use(store).use(router).use(ElementPlus).mount("#app");

config(app);
useComponents(app);
