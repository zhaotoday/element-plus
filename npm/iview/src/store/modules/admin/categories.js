import createStore from "view-ui-admin/src/utils/create-store";
import Model from "@/models/admin/categories";

export default createStore({
  Model,
  types: {
    RESET_LIST: null
  },
  mutations({ types }) {
    return {
      [types.RESET_LIST](state) {
        state.list = {};
      }
    };
  },
  actions({ types }) {
    return {
      resetList({ commit }, payload) {
        commit(types.RESET_LIST, payload);
      }
    };
  }
});
