import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { ref } from "vue";
import { adsApi } from "@/apis/admin/ads";
import BForm from "./components/form/index.vue";
import { ElMessage } from "element-plus";

export default {
  components: {
    BForm,
  },
  setup() {
    const formRef = ref(null);

    const { enums } = useEnums();

    const { list, currentPage, cFilters, reRender, onPageChange, search } =
      useList({
        api: adsApi,
        filters: {
          model: {
            title: { $like: "" },
          },
          rules: {},
        },
        extraQuery: {
          order: [["order", "DESC"]],
        },
      });

    const del = async ({ id }) => {
      await adsApi.delete({ id });
      ElMessage.success("删除成功");
      await reRender();
    };

    return {
      adsApi,
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
