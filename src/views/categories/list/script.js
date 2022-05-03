import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { ref } from "vue";
import { categoriesApi } from "@/apis/admin/categories";
import Form from "./components/form/index.vue";
import { ElMessage } from "element-plus";

export default {
  components: {
    "b-form": Form,
  },
  setup() {
    const form = ref(null);

    const { enums } = useEnums();

    const { list, currentPage, cFilters, reRender, onPageChange, search } =
      useList({
        api: categoriesApi,
        filters: {
          model: {
            name: { $like: "" },
            cnName: { $like: "" },
          },
          rules: {},
        },
        extraQuery: {
          order: [["order", "ASC"]],
        },
      });

    const del = async ({ id }) => {
      await categoriesApi.delete({ id });
      ElMessage.success("删除成功");
      await reRender();
    };

    return {
      categoriesApi,
      form,
      enums,
      list,
      currentPage,
      cFilters,
      reRender,
      onPageChange,
      search,
      del,
    };
  },
};
