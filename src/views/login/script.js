import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useValidators } from "vue-validation";
import Login from "@/components/login/index.vue";
import LoginHeader from "@/components/login/components/header/index.vue";
import LoginMain from "@/components/login/components/main/index.vue";
import LoginFooter from "@/components/login/components/footer/index.vue";
import Form from "./components/form/index.vue";
import { UserFilled } from "@element-plus/icons";

export default {
  components: {
    "c-login": Login,
    "c-login-header": LoginHeader,
    "c-login-main": LoginMain,
    "c-login-footer": LoginFooter,
    "b-form": Form,
  },
};
