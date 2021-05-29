import store from "jt-storage";

export const getUser = () => {
  const vuexStore = store.get("vuex");

  try {
    return vuexStore && JSON.parse(vuexStore).auth
      ? JSON.parse(vuexStore).auth.user
      : {};
  } catch (e) {
    return {};
  }
};

export const getToken = () => {
  return getUser().token || "";
};

export const getRequestHeaders = () => {
  return { Authorization: `Bearer ${getToken()}` };
};

export const loggedIn = () => {
  return !!getToken();
};

export const logout = () => {
  store.remove("vuex");
};
