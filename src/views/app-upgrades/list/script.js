import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { ref } from "vue";
import { appUpgradesApi } from "@/apis/admin/app-upgrades";
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
        api: appUpgradesApi,
        filters: {
          model: {
            versionName: { $like: "" },
            versionCode: { $like: "" },
            status: undefined,
          },
          rules: {},
        },
      });

    const del = async ({ id }) => {
      await appUpgradesApi.delete({ id });
      ElMessage.success("删除成功");
      await reRender();
    };

    return {
      appUpgradesApi,
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
