import Login from "element-plus-admin/components/login/index.vue";
import LoginHeader from "element-plus-admin/components/login/components/header/index.vue";
import LoginMain from "element-plus-admin/components/login/components/main/index.vue";
import LoginFooter from "element-plus-admin/components/login/components/footer/index.vue";
import BForm from "./components/form/index.vue";

export default {
  components: {
    "c-login": Login,
    "c-login-header": LoginHeader,
    "c-login-main": LoginMain,
    "c-login-footer": LoginFooter,
    BForm,
  },
};
