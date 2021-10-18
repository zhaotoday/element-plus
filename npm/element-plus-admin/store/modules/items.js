import { keyMirror } from "jt-helpers";

const state = {
  data: {},
};

const types = keyMirror({
  SetData: null,
});

const mutations = {
  [types.SetData](state, { resource, key, items }) {
    state[resource][key] = items;
  },
};

const actions = {
  async getItems({ state, commit }, { resource, api, ids }) {
    const key = ids.join(",");

    if (state[resource] && state[resource][key]) {
      return state[resource][key];
    } else {
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
