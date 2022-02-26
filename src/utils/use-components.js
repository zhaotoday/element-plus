import Editor from "element-plus-admin/components/editor/index.vue";
import List from "element-plus-admin/components/list/index.vue";
import ListImage from "element-plus-admin/components/list/components/image/index.vue";
import OrderInput from "element-plus-admin/components/order-input/index.vue";
import ResourceSelect from "element-plus-admin/components/resource-select/index.vue";
import Upload from "element-plus-admin/components/upload/index.vue";
import { Eleme, Right } from "@element-plus/icons";

export const useComponents = (app) => {
  app.component("c-editor", Editor);
  app.component("c-list", List);
  app.component("c-list-image", ListImage);
  app.component("c-order-input", OrderInput);
  app.component("c-resource-select", ResourceSelect);
  app.component("c-upload", Upload);
  app.component("el-icon-right", Right);
  app.component("el-icon-eleme", Eleme);
};
