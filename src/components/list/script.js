import { consts } from "@/utils/consts";

export default {
  name: "List",
  emits: ["page-change"],
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: consts.PageSize
    },
    currentPage: {
      type: Number,
      default: 1
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showPagination: {
      type: Boolean,
      default: true
    }
  }
};
