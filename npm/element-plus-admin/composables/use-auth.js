import storage from "jt-storage";

export const useAuth = () => {
  const getUser = () => {
    const vuexStore = storage.get("vuex");

    try {
      return vuexStore && JSON.parse(vuexStore).auth
        ? JSON.parse(vuexStore).auth.user
        : {};
    } catch (e) {
      return {};
    }
  };

  const getToken = () => {
    return getUser().token || "";
  };

  const getRequestHeaders = () => {
    return { Authorization: `Bearer ${getToken()}` };
  };

  const loggedIn = () => {
    return !!getToken();
  };

  const logout = () => {
    storage.remove("vuex");
  };

  return {
    getUser,
    getToken,
    getRequestHeaders,
    loggedIn,
    logout,
  };
};
