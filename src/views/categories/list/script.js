import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { ref } from "vue";
import { categoriesApi } from "@/apis/admin/categories";
import BForm from "./components/form/index.vue";

export default {
  components: {
    BForm,
  },
  setup() {
    const formRef = ref(null);

    const { enums } = useEnums();

    const { list, currentPage, cFilters, reRender, onPageChange, search, del } =
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
