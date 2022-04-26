import Login from "@/components/login/index.vue";
import LoginHeader from "@/components/login/components/header/index.vue";
import LoginMain from "@/components/login/components/main/index.vue";
import LoginFooter from "@/components/login/components/footer/index.vue";
import Form from "./components/form/index.vue";

export default {
  components: {
    "c-login": Login,
    "c-login-header": LoginHeader,
    "c-login-main": LoginMain,
    "c-login-footer": LoginFooter,
    "b-form": Form,
  },
};
