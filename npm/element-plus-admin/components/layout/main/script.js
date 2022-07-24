import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export default {
  props: {
    menus: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const menus = ref([{}, {}, {}, {}]);

    const renderMenus = (path) => {
      const routePaths = path.substr(1).split("/");

      menus.value = [{}, {}, {}, {}];

      props.menus.forEach((item1) => {
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
                  (itemPaths[2] === ":id" &&
                    !isNaN(routePaths[2]) &&
                    itemPaths[3] === routePaths[3])
                ) {
                  menus.value[2] = item3;

                  if (item3.children) {
                    item3.children.forEach((item4) => {
                      const itemPaths = item4.path.substr(1).split("/");

                      if (
                        routePaths[4] === itemPaths[4] ||
                        (itemPaths[4] === ":id" &&
                          !isNaN(routePaths[4]) &&
                          itemPaths[5] === routePaths[5])
                      ) {
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
