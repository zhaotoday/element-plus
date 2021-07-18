import { useHelpers } from "@/composables/use-helpers";
import { PublicEnumsApi } from "../../apis/public/enums";

const { keyMirror } = useHelpers();

const state = {
  data: {
    config: {
      version: "",
    },
  },
};

const types = keyMirror({
  SetData: null,
});

const mutations = {
  [types.SetData](state, data) {
    state.data = data;
  },
};

const actions = {
  async get({ commit }) {
    const res = await new PublicEnumsApi().GET({});
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
