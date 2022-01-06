import { onMounted, ref } from "vue";
import TheHeader from "./header/index.vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { useConsts } from "@/composables/use-consts";

export default {
  name: "TheMain",
  components: {
    TheHeader,
  },
  setup() {
    const menus = ref([{}, {}, {}]);

    const renderMenus = (path) => {
      menus.value = [{}, {}, {}];

      useConsts().SidebarMenu.forEach((item1) => {
        item1.children.forEach((item2) => {
          const routePaths = path.split("/");

          if (item2.children) {
            item2.children.forEach((item3) => {
              const itemPaths = item3.path.split("/");

              if (
                routePaths[2] === itemPaths[2] &&
                routePaths[3] === itemPaths[3]
              ) {
                menus.value[0] = item1;
                menus.value[1] = item2;

                if (
                  routePaths[4] === itemPaths[4] &&
                  routePaths[5] === itemPaths[5]
                ) {
                  menus.value[2] = item3;
                }
              }
            });
          } else {
            const itemPaths = item2.path.split("/");

            if (
              routePaths[2] === itemPaths[2] &&
              routePaths[3] === itemPaths[3]
            ) {
              menus.value = [item1, item2, {}];
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
