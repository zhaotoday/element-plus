import { useConsts } from "@/composables/use-consts";

export default {
  name: "List",
  emits: ["page-change"],
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
  },
};
