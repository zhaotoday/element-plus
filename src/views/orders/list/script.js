import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { usersApi } from "@/apis/admin/users";

export default {
  setup() {
    const { enums } = useEnums();

    const { list, currentPage, cFilters, reRender, onPageChange, search } =
      useList({
        api: usersApi,
        filters: {
          model: {
            nickName: { $like: "" },
            phoneNumber: { $like: "" },
          },
          rules: {},
        },
      });

    return {
      usersApi,
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
