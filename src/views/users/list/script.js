import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { ref } from "vue";
import { usersApi } from "@/apis/admin/users";
import Form from "./components/form/index.vue";
import { ElMessage } from "element-plus";

export default {
  components: {
    "vc-form": Form,
  },
  setup() {
    const form = ref(null);

    const { enums } = useEnums();

    const { list, currentPage, cFilters, reRender, onPageChange, search } =
      useList({
        api: usersApi,
        filters: {
          model: {
            name: { $like: "" },
          },
          rules: {},
        },
        extraQuery: {
          order: [["order", "DESC"]],
        },
      });

    const del = async ({ id }) => {
      await usersApi.delete({ id });
      ElMessage.success("删除成功");
      await reRender();
    };

    return {
      usersApi,
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
