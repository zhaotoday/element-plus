import List from "@/components/list/index.vue";
import ListImage from "@/components/list-image/index.vue";

export const useComponents = (app) => {
  app.component("c-list", List);
  app.component("c-list-image", ListImage);
};
