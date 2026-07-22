import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { ref } from "vue";
import { appUpgradesApi } from "@/apis/admin/app-upgrades";
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

    return {
      appUpgradesApi,
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
