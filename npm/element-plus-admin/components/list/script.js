import { useConsts } from "@/composables/use-consts";
import { ref } from "vue";

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
  setup(props) {
    const currentPageSize = ref(props.pageSize);

    const onPageSizeChange = (a) => {
      console.log(a);
    };

    return {
      currentPageSize,
      onPageSizeChange,
    };
  },
};
