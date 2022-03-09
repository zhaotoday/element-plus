import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { ordersApi } from "@/apis/admin/orders";

export default {
  setup() {
    const { enums } = useEnums();

    const { list, currentPage, cFilters, reRender, onPageChange, search } =
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

    return {
      ordersApi,
      enums,
      list,
      currentPage,
      cFilters,
      reRender,
      onPageChange,
      search,
    };
  },
};
