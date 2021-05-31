import List from "element-plus-admin/components/list/index.vue";
import ListImage from "element-plus-admin/components/list-image/index.vue";

export const useComponents = (app) => {
  app.component("c-list", List);
  app.component("c-list-image", ListImage);
};
