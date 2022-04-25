import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useValidators } from "vue-validation";
import Header from "./components/header/index.vue";
import Main from "./components/main/index.vue";
import Footer from "./components/footer/index.vue";
import { UserFilled } from "@element-plus/icons";

export default {
  components: {
    "b-header": Header,
    "b-main": Main,
    "b-footer": Footer,
  },
  setup() {
    const { dispatch } = useStore();
    const router = useRouter();
    const { isRequired } = useValidators();

    const form = ref(null);

    const cForm = reactive({
      model: {},
      rules: {
        username: [isRequired({ label: "用户名" })],
        password: [isRequired({ label: "密码" })],
      },
    });

    const submit = () => {
      form.value.validate(async (valid) => {
        if (valid) {
          await dispatch("auth/login", cForm.model);
          ElMessage.success("登录成功");
          await dispatch("auth/getMenus");
          await router.push("/");
        }
      });
    };

    return {
      UserFilled,
      form,
      cForm,
      submit,
    };
  },
};
