import { useList } from "element-plus-admin/components/list/composables/use-list";
import { useEnums } from "element-plus-admin/composables/use-enums";
import { onMounted, ref } from "vue";
import { teamMembersApi } from "@/apis/admin/team-members";
import Form from "./components/form/index.vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";

export default {
  components: {
    "b-form": Form,
  },
  setup() {
    const { params } = useRoute();

    const form = ref(null);

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
      api: teamMembersApi,
      autoRender: false,
      filters: {
        model: {
          name: { $like: "" },
        },
        rules: {},
      },
      extraQuery: () => ({
        order: [["order", "ASC"]],
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
          name: { $like: "" },
        },
      });
    });

    const del = async ({ id }) => {
      await teamMembersApi.delete({ id });
      ElMessage.success("删除成功");
      await reRender();
    };

    return {
      teamMembersApi,
      currentPath,
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
