import storage from "jt-storage";

const USER = "user";
const TOKEN = "token";

export default {
  get() {
    return {
      [USER]: storage.get(USER),
      [TOKEN]: storage.get(TOKEN)
    };
  },

  login({ user, token }) {
    storage.set(USER, user);
    storage.set(TOKEN, `Bearer ${token}`);
  },

  logout() {
    storage.remove(USER);
    storage.remove(TOKEN);
  },

  loggedIn() {
    return !!storage.get(USER) && !!storage.get(TOKEN);
  },

  getHeaders() {
    return { Authorization: this.get()["token"] };
  }
};
