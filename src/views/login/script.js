import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const { dispatch } = useStore();
    const router = useRouter();

    const form = ref(null);

    const cForm = reactive({
      model: {},
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
          },
          {
            min: 6,
            max: 30,
            message: "密码格式错误",
          },
        ],
      },
    });

    const submit = () => {
      form.value.validate(async (valid) => {
        if (valid) {
          await dispatch("auth/login", cForm.model);
          ElMessage.success("登录成功");
          await dispatch("auth/getMenus");
          await router.push("/questions/list");
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
