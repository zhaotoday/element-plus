import { helpers } from "@/utils/helpers";
import { ManagersApi } from "@/apis/public/managers";

const state = {
  user: {
    id: "",
    name: "",
    token: "",
  },
  menus: [],
};

const types = helpers.keyMirror({
  SetUser: null,
  SetMenus: null,
});

const mutations = {
  [types.SetUser](state, user) {
    state.user = user;
  },
  [types.SetMenus](state, menus) {
    state.menus = menus;
  },
};

const actions = {
  async login({ commit }, data) {
    const res = await new ManagersApi()
      .addPath("actions/login")
      .POST({ body: data });

    const {
      manager: { id, username },
      token,
    } = res;

    commit(types.SetUser, { id, name: username, token });

    return res;
  },

  async getMenus() {
    return null;
  },
  logout({ commit }) {
    commit(types.SetUser, state.user);
    commit(types.SetMenus, state.menus);
    return null;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
