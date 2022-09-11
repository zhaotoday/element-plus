import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { ref } from "vue";
import BForm from "./components/form/index.vue";
import { productsApi } from "@/apis/admin/products";
import { categoriesApi } from "@/apis/admin/categories";

export default {
  components: {
    BForm,
  },
  setup() {
    const formRef = ref(null);

    const { enums } = useEnums();

    const { list, currentPage, cFilters, reRender, onPageChange, search, del } =
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

    return {
      categoriesApi,
      formRef,
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
