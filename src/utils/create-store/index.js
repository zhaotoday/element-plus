import getGetters from "./getters";
import getActions from "./actions";
import getMutations from "./mutations";
import helpers from "jt-helpers";

export default ({
  Model = null,
  state = {},
  types = {},
  getters = () => ({}),
  mutations = () => ({}),
  actions = () => ({})
}) => {
  const initState = {
    list: {
      items: [],
      total: 0
    },
    detail: {},
    ...state
  };

  types = helpers.keyMirror({
    GET_LIST: null,
    GET_DETAIL: null,
    ...types
  });

  return {
    namespaced: true,
    state: {
      ...initState,
      getInitState: () => initState
    },
    getters: { ...getGetters(), ...getters() },
    mutations: { ...getMutations({ types }), ...mutations({ types }) },
    actions: { ...getActions({ types, Model }), ...actions({ types, Model }) }
  };
};
