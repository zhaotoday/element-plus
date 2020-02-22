import Model from "@/models/public/managers";

export default {
  postAction({ commit }, { query, body }) {
    return new Model().addPath("actions").POST({ query, body });
  }
};
