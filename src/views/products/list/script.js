import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { ref } from "vue";
import Form from "./components/form/index.vue";
import { ElMessage } from "element-plus";
import { productsApi } from "@/apis/admin/products";
import { categoriesApi } from "@/apis/admin/categories";

export default {
  components: {
    "vc-form": Form,
  },
  setup() {
    const form = ref(null);

    const { enums } = useEnums();

    const { list, currentPage, cFilters, reRender, onPageChange, search } =
      useList({
        api: productsApi,
        filters: {
          model: {
            categoryId: undefined,
            name: { $like: "" },
            cnName: { $like: "" },
          },
          rules: {},
        },
        extraQuery: {
          include: [{ model: "Category", as: "category" }],
        },
      });

    const del = async ({ id }) => {
      await productsApi.delete({ id });
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
