import createStore from "../../../utils/create-store";
import Model from "../../../models/admin/categories";

export default createStore({
  Model,
  mutations(types) {
    return {
      [types.RESET_LIST](state) {
        state.list = {};
      }
    };
  },
  actions(types) {
    return {
      resetList({ commit }, payload) {
        commit(types.RESET_LIST, payload);
      }
    };
  }
});
