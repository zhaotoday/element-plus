import List from "element-plus-admin/components/list/index.vue";
import ListImage from "element-plus-admin/components/list/components/image/index.vue";
import { Eleme, Right } from "@element-plus/icons";

export const useComponents = (app) => {
  app.component("c-list", List);
  app.component("c-list-image", ListImage);
  app.component("el-icon-right", Right);
  app.component("el-icon-eleme", Eleme);
};
