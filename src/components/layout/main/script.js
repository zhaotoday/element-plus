import { onMounted, ref } from "vue";
import TheHeader from "./header";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { consts } from "@/utils/consts";

export default {
  name: "TheMain",
  components: {
    TheHeader
  },
  setup() {
    const menus = ref([{}, {}]);

    const renderMenus = path => {
      consts.SidebarMenu.forEach(item1 => {
        item1.children.forEach(item2 => {
          const routePaths = path.split("/");
          const itemPaths = item2.path.split("/");

          if (
            routePaths[1] === itemPaths[1] &&
            routePaths[2] === itemPaths[2]
          ) {
            menus.value[0] = item1;
            menus.value[1] = item2;
          }
        });
      });
    };

    onMounted(() => {
      renderMenus(useRoute().path);
    });

    onBeforeRouteUpdate(async (to, from, next) => {
      renderMenus(to.path);
      next();
    });

    return {
      menus
    };
  }
};
