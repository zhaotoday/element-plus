import { onMounted, reactive, ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useConsts } from "@/composables/use-consts";
import helpers from "jt-helpers";
import { useHelpers } from "./use-helpers";

export const useList = ({
  onRendered,
  routeMode = true,
  autoRender = true,
  filtersAsKeyValue = false,
  api,
  filters = {},
  data = {},
  extraQuery = {},
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
      query: { ...query, ...extraQuery },
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

  const onPageChange = async (current) => {
    if (!loading.value) {
      if (routeMode) {
        const query = getQuery(route.query);

        await router.replace({
          query: {
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
