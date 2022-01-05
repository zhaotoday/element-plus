import { keyMirror } from "jt-helpers";

const state = {
  data: {},
};

const types = keyMirror({
  SetData: null,
});

const mutations = {
  [types.SetData](state, { resource, key, items }) {
    state.data[resource] = {
      ...state.data[resource],
      [key]: items,
    };
  },
};

const actions = {
  async getItems({ state, commit }, { resource, api, ids }) {
    const key = ids ? ids.join(",") : "__";

    if (state.data[resource] && state.data[resource][key]) {
      return state.data[resource][key];
    } else {
      state.data[resource] = {
        ...state.data[resource],
        [key]: [],
      };

      const { items } = await api.post({
        action: "findAllByIds",
        body: { ids },
      });

      commit(types.SetData, { resource, key, items });

      return items;
    }
  },
};

export const items = {
  namespaced: true,
  state,
  mutations,
  actions,
};
