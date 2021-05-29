import { reactive, ref } from "vue";
import { helpers } from "@/utils/helpers";
import { ElMessage } from "element-plus";
import { QuestionsModel } from "@/models/admin/questions";

export default {
  emits: ["render-list"],
  setup(props, context) {
    const initModel = {};

    const form = ref(null);

    const cDialog = reactive({
      visible: false
    });

    const cForm = reactive({
      updateMode: false,
      model: helpers.deepCopy(initModel),
      rules: {
        title: [
          {
            required: true,
            message: "谜面不能为空"
          }
        ],
        answer: [
          {
            required: true,
            message: "谜面不能为空"
          }
        ]
      }
    });

    const show = row => {
      cForm.model = helpers.deepCopy(row || initModel);
      cForm.updateMode = !!row;
      cDialog.visible = true;
      form.value && form.value.resetFields();
    };

    const submit = () => {
      form.value.validate(async valid => {
        if (!valid) return;

        if (cForm.updateMode) {
          const { id, ...restModel } = cForm.model;
          await new QuestionsModel().PUT({ id, body: restModel });
          ElMessage.success("修改成功");
        } else {
          await new QuestionsModel().POST({ body: cForm.model });
          ElMessage.success("添加成功");
        }

        cDialog.visible = false;

        context.emit("render-list");
      });
    };

    return {
      cDialog,
      cForm,
      form,
      show,
      submit
    };
  }
};
