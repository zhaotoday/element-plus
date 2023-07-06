import { onMounted, reactive, ref } from "vue";
import { useValidators } from "vue-validation";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { contentsApi } from "@/apis/admin/contents";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const { params } = useRoute();

    const form = ref(null);

    const { isRequired } = useValidators();

    const currentPath = ref("");

    const cForm = reactive({
      model: {
        content: "",
      },
      rules: {
        content: [isRequired({ message: "内容不能为空" })],
      },
    });

    onMounted(async () => {
      await render(params.path);
    });

    onBeforeRouteUpdate(async (to, from, next) => {
      cForm.model.content = "";
      await render(to.params.path);
      next();
    });

    const render = async (path) => {
      currentPath.value = path.replace("-", "/");

      const { content } = await contentsApi.post({
        action: "findByPath",
        body: { path: currentPath.value },
      });

      cForm.model.content = content;
      console.log(cForm.model.content, content, "--");
    };

    const submit = async () => {
      form.value.validate(async (valid) => {
        if (valid) {
          await contentsApi.post({
            action: "updateByPath",
            body: {
              path: currentPath.value,
              content: cForm.model.content,
            },
          });

          ElMessage.success("保存成功");
        }
      });
    };

    return {
      form,
      cForm,
      currentPath,
      submit,
    };
  },
};
