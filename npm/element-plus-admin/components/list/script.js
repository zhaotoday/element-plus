import { useConsts } from "@/composables/use-consts";
import { ref } from "vue";

export default {
  name: "List",
  emits: ["page-change", "page-size-change"],
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: useConsts().PageSize,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    simpleHeader: {
      type: Boolean,
      default: true,
    },
    showPageSizes: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const currentPageSize = ref(props.pageSize);

    return {
      currentPageSize,
    };
  },
};
