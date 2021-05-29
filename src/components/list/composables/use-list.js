import { onMounted, reactive, ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { consts } from "@/utils/consts";
import { helpers } from "@/utils/helpers";
import { $helpers } from "./utils/helpers";

export const useList = ({
  onRendered,
  routeMode = true,
  autoRender = true,
  filtersAsKeyValue = false,
  api,
  filters = {},
  sort = "",
} = {}) => {
  const route = useRoute();
  const router = useRouter();
  const list = reactive({ items: [], total: 0 });
  const loading = ref(false);
  const currentPage = ref(1);
  const cFilters = reactive({
    ref: (el) => (filtersRef = el),
    ...filters,
  });
  const filtersModel = filters.model;

  let filtersRef = null;

  const getQuery = (query) => {
    const { currentPage = 1, filters = helpers.deepCopy(filtersModel) } =
      $helpers.decode(query.$list);

    return { currentPage, filters };
  };

  const render = async ({
    currentPage = 1,
    filters = helpers.deepCopy(filtersModel),
  } = {}) => {
    const query = {
      offset: (currentPage - 1) * consts.PageSize,
      limit: consts.PageSize,
      // sort: $helpers.formatOrders(sort)
    };

    console.log(sort);

    if (filtersAsKeyValue) {
      Object.assign(query, filters);
    } else {
      // query.where = $helpers.formatFilters(filters);
    }

    const { items, total } = await api.GET({ query });

    list.items = items;
    list.total = total;

    onRendered && onRendered();
  };

  const initialize = async ({ filters = helpers.deepCopy(filtersModel) }) => {
    currentPage.value = 1;
    cFilters.model = filters;
    await render({ filters });
  };

  onMounted(async () => {
    if (!autoRender) return;

    const query = getQuery(route.query);

    currentPage.value = query.currentPage;
    cFilters.model = query.filters;

    await render(query);
  });

  onBeforeRouteUpdate(async (to, from, next) => {
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
              $list: $helpers.encode({
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

  const onPageChange = async (current) => {
    if (!loading.value) {
      if (routeMode) {
        const query = getQuery(route.query);

        await router.replace({
          query: {
            $list: $helpers.encode({ ...query, currentPage: current }),
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

  return {
    list,
    currentPage,
    cFilters,
    render,
    initialize,
    reRender,
    search,
    onPageChange,
  };
};
