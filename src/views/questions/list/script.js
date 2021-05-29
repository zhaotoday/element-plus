import { ref } from "vue";
import { useList } from "@/components/list/composables/use-list";
import { QuestionsModel } from "@/models/admin/questions";
import IForm from "./components/form";
import { ElMessage } from "element-plus";

export default {
  components: { IForm },
  setup() {
    const form = ref(null);

    const { list, currentPage, reRender, onPageChange } = useList({
      api: new QuestionsModel()
    });

    const del = async ({ id }) => {
      await new QuestionsModel().DELETE({ id });
      await reRender();
      ElMessage.success("删除成功");
    };

    return {
      form,
      list,
      currentPage,
      reRender,
      onPageChange,
      del
    };
  }
};
