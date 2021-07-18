import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useFormValidators } from "element-plus-admin/composables/use-form-validators";

export default {
  setup() {
    const { dispatch } = useStore();
    const router = useRouter();
    const formValidators = useFormValidators();

    const form = ref(null);

    const cForm = reactive({
      model: {},
      rules: {
        username: [formValidators.required({ label: "用户名" })],
        password: [
          formValidators.required({ label: "密码" }),
          formValidators.password(),
        ],
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
      form,
      cForm,
      submit,
    };
  },
};
