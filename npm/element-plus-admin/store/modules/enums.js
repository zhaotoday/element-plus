import helpers from "jt-helpers";
import { PublicEnumsApi } from "../../apis/public/enums";

const state = {
  data: {
    config: {
      version: "",
    },
  },
};

const types = helpers.keyMirror({
  SetData: null,
});

const mutations = {
  [types.SetData](state, data) {
    state.data = data;
  },
};

const actions = {
  async get({ commit }) {
    const res = await new PublicEnumsApi().get({});
    commit(types.SetData, res);
    return res;
  },
};

export const enums = {
  namespaced: true,
  state,
  mutations,
  actions,
};
