import { computed, onMounted, reactive, ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useConsts } from "@/composables/use-consts";
import helpers from "jt-helpers";
import { useHelpers } from "./use-helpers";
import { adsApi } from "../../../../../src/apis/admin/ads";
import { ElMessage, ElMessageBox } from "element-plus";

export const useList = ({
  onRendered,
  routeMode = true,
  autoRender = true,
  filtersAsKeyValue = false,
  api,
  filters = {},
  data = {},
  extraQuery = {},
  mounted = () => {},
  beforeRouteUpdate = () => {},
} = {}) => {
  const route = useRoute();
  const router = useRouter();
  const { formatFilters, encode, decode } = useHelpers();
  const list = reactive({ items: [], total: 0 });
  const loading = ref(false);
  const currentPage = ref(1);
  const cFilters = reactive({
    ref: (el) => (filtersRef = el),
    ...filters,
  });
  const filtersModel = filters.model;

  let filtersRef = null;

  const state = reactive({
    checkAll: false,
    checkedItems: {},
  });

  const checkedIds = computed(() =>
    Object.keys(state.checkedItems)
      .filter((key) => state.checkedItems[key])
      .map((item) => parseInt(item, 10))
  );

  const getQuery = (query) => {
    const { currentPage = 1, filters = helpers.deepCopy(filtersModel) } =
      decode(query.$list);

    return { currentPage, filters };
  };

  const render = async ({
    currentPage = 1,
    filters = helpers.deepCopy(filtersModel),
  } = {}) => {
    const { PageSize } = useConsts();

    const query = {
      offset: (currentPage - 1) * PageSize,
      limit: PageSize,
      ...data,
    };

    if (filtersAsKeyValue) {
      Object.assign(query, filters);
    } else {
      query.where = formatFilters(filters);
    }

    const { items, total, ...extra } = await api.get({
      query: {
        ...query,
        ...(typeof extraQuery === "function" ? extraQuery() : extraQuery),
      },
    });

    list.items = items;
    list.total = total;
    list.extra = extra;

    onRendered && onRendered();
  };

  const initialize = async ({ filters = helpers.deepCopy(filtersModel) }) => {
    currentPage.value = 1;
    cFilters.model = filters;
    await render({ filters });
  };

  onMounted(async () => {
    await mounted();

    if (!autoRender) return;

    const query = getQuery(route.query);

    currentPage.value = query.currentPage;
    cFilters.model = query.filters;

    await render(query);
  });

  onBeforeRouteUpdate(async (to, from, next) => {
    await beforeRouteUpdate(to, from);

    if (!routeMode) return;

    filtersRef && filtersRef.resetFields();

    const query = getQuery(to.query);

    currentPage.value = query.currentPage;
    cFilters.model = query.filters;

    await render(query);

    next();
  });

  const reRender = async () => {
    await render(getQuery(route.query));
  };

  const search = async (filters = {}) => {
    filtersRef &&
      filtersRef.validate(async (valid) => {
        if (!valid) return;

        loading.value = true;

        if (routeMode) {
          await router.replace({
            query: {
              ...route.query,
              $list: encode({
                currentPage: 1,
                filters: { ...cFilters.model, ...filters },
              }),
            },
          });
        } else {
          currentPage.value = 1;
          cFilters.model = { ...cFilters.model, ...filters };

          await render({
            currentPage: 1,
            filters: cFilters.model,
          });
        }

        loading.value = false;
      });
  };

  const del = async ({ id }) => {
    await api.delete({ id });
    ElMessage.success("删除成功");
    await reRender();
  };

  const bulkDel = async () => {
    if (!checkedIds.value.length) {
      ElMessage.error("未选中数据");
      return;
    }

    await ElMessageBox.confirm("确认删除选中数据?", "提示", {
      confirmButtonText: "删除",
      confirmButtonClass: "el-button--danger",
      cancelButtonText: "取消",
      type: "warning",
    });

    await api.post({
      action: "bulkDestroy",
      body: { ids: checkedIds.value },
    });
    ElMessage.success("删除成功");
    await reRender();
  };

  const onPageChange = async (current) => {
    if (!loading.value) {
      if (routeMode) {
        const query = getQuery(route.query);

        await router.replace({
          query: {
            ...route.query,
            $list: encode({ ...query, currentPage: current }),
          },
        });
      } else {
        loading.value = true;
        currentPage.value = current;
        await render({ currentPage: current, filters: cFilters.model });
        loading.value = false;
      }
    }
  };

  const onCheckAllChange = () => {
    list.items.forEach((item) => {
      state.checkedItems[item.id + ""] = state.checkAll;
    });
  };

  const onCheckChange = () => {
    let isAllChecked = true;

    list.items.forEach((item) => {
      if (!state.checkedItems[item.id + ""]) {
        isAllChecked = false;
      }
    });

    state.checkAll = isAllChecked;
  };

  return {
    list,
    currentPage,
    cFilters,
    state,
    checkedIds,
    render,
    initialize,
    reRender,
    search,
    del,
    bulkDel,
    onPageChange,
    onCheckAllChange,
    onCheckChange,
  };
};
