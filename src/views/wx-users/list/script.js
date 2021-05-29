import { useList } from "@/components/list/composables/use-list";
import { WxUsersModel } from "@/models/admin/wx-users";

export default {
  setup() {
    const {
      list,
      currentPage,
      reRender,
      onPageChange,
      search,
      cFilters
    } = useList({
      api: new WxUsersModel(),
      filters: {
        model: {},
        rules: {}
      }
    });

    const getPrize = answeredQuestionsCount => {
      if (answeredQuestionsCount >= 9) {
        return "一等奖";
      } else if (answeredQuestionsCount <= 8 && answeredQuestionsCount >= 6) {
        return "二等奖";
      } else if (answeredQuestionsCount <= 5 && answeredQuestionsCount >= 3) {
        return "三等奖";
      } else {
        return "未获奖";
      }
    };

    return {
      list,
      currentPage,
      reRender,
      onPageChange,
      search,
      cFilters,
      getPrize
    };
  }
};
