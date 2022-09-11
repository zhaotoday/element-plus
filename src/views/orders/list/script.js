import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { ordersApi } from "@/apis/admin/orders";
import BDetail from "./components/detail/index.vue";
import { ref } from "vue";

export default {
  components: {
    BDetail,
  },
  setup() {
    const { enums } = useEnums();

    const { list, currentPage, cFilters, reRender, onPageChange, search, del } =
      useList({
        api: ordersApi,
        filters: {
          model: {
            no: { $like: "" },
          },
          rules: {},
        },
        extraQuery: {
          include: [{ model: "User", as: "user" }],
        },
      });

    const detail = ref(null);

    return {
      ordersApi,
      enums,
      list,
      currentPage,
      cFilters,
      detail,
      reRender,
      onPageChange,
      search,
      del,
    };
  },
};
