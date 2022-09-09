import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { ordersApi } from "@/apis/admin/orders";
import { ElMessage } from "element-plus";
import BDetail from "./components/detail/index.vue";
import { ref } from "vue";

export default {
  components: {
    BDetail,
  },
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

    const detail = ref(null);

    const del = async ({ id }) => {
      await ordersApi.delete({ id });
      ElMessage.success("删除成功");
      await reRender();
    };

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
