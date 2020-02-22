import auth from "../auth";

export default {
  getHeaders() {
    return {
      Authorization: auth.get()["token"]
    };
  }
};
