import CEditor from "@/components/editor";
import CEnumSelect from "element-plus-admin/components/enum-select/index.vue";
import CList from "element-plus-admin/components/list/index.vue";
import CListImage from "element-plus-admin/components/list/components/image/index.vue";
import COrderInput from "element-plus-admin/components/order-input/index.vue";
import CResourceSelect from "element-plus-admin/components/resource-select/index.vue";
import CUpload from "element-plus-admin/components/upload/index.vue";
import { Eleme, Right } from "@element-plus/icons-vue";

export const useComponents = (app) => {
  app.component("c-editor", CEditor);
  app.component("c-enum-select", CEnumSelect);
  app.component("c-list", CList);
  app.component("c-list-image", CListImage);
  app.component("c-order-input", COrderInput);
  app.component("c-resource-select", CResourceSelect);
  app.component("c-upload", CUpload);
  app.component("el-icon-right", Right);
  app.component("el-icon-eleme", Eleme);
};
