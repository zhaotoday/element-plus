import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { onMounted, ref } from "vue";
import { articlesApi } from "@/apis/admin/articles";
import Form from "./components/form/index.vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";

export default {
  components: {
    "b-form": Form,
  },
  setup() {
    const { params } = useRoute();

    const formRef = ref(null);

    const currentPath = ref("");

    const { enums } = useEnums();

    const {
      list,
      currentPage,
      cFilters,
      reRender,
      onPageChange,
      search,
      initialize,
    } = useList({
      api: articlesApi,
      autoRender: false,
      filters: {
        model: {
          title: { $like: "" },
        },
        rules: {},
      },
      extraQuery: () => ({
        order: [["order", "DESC"]],
        where: { path: currentPath.value, ...cFilters.model },
      }),
      beforeRouteUpdate(to, from) {
        if (to.params.path !== from.params.path) {
          currentPath.value = to.params.path.replace("-", "/");
        }
      },
    });

    onMounted(async () => {
      currentPath.value = params.path.replace("-", "/");

      await initialize({
        filters: {
          title: { $like: "" },
        },
      });
    });

    const del = async ({ id }) => {
      await articlesApi.delete({ id });
      ElMessage.success("删除成功");
      await reRender();
    };

    return {
      articlesApi,
      currentPath,
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
