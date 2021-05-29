import List from "@/components/list";
import ListImage from "@/components/list-image";

export const useComponents = app => {
  app.component("c-list", List);
  app.component("c-list-image", ListImage);
};
