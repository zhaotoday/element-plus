import { onMounted, ref } from "vue";
import { consts } from "@/utils/consts";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export const useActiveMenu = () => {
  const activeMenu = ref({});

  const render = (path) => {
    consts.SidebarMenu.forEach((item) => {
      if (path === item.path) {
        activeMenu.value = item;
      }
    });
  };

  onMounted(() => {
    render(useRoute().path);
  });

  onBeforeRouteUpdate(async (to, from, next) => {
    render(to.path);
    next();
  });

  return {
    activeMenu,
  };
};
