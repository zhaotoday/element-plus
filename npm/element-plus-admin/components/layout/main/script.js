import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { useConsts } from "@/composables/use-consts";

export default {
  setup() {
    const menus = ref([{}, {}, {}, {}]);

    const renderMenus = (path) => {
      const routePaths = path.substr(1).split("/");

      menus.value = [{}, {}, {}, {}];

      useConsts().SidebarMenu.forEach((item1) => {
        item1.children.forEach((item2) => {
          const itemPaths = item2.path.substr(1).split("/");

          if (
            routePaths[0] === itemPaths[0] &&
            routePaths[1] === itemPaths[1]
          ) {
            menus.value[0] = item1;
            menus.value[1] = item2;

            if (item2.children) {
              item2.children.forEach((item3) => {
                const itemPaths = item3.path.substr(1).split("/");

                if (
                  routePaths[2] === itemPaths[2] ||
                  (itemPaths[2] === ":id" && !isNaN(routePaths[2]))
                ) {
                  menus.value[2] = item3;

                  if (item3.children) {
                    item3.children.forEach((item4) => {
                      const itemPaths = item4.path.substr(1).split("/");

                      if (routePaths[3] === itemPaths[3]) {
                        menus.value[3] = item4;
                      }
                    });
                  }
                }
              });
            }
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
      menus,
    };
  },
};
