import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import storage from "jt-storage";
import modules from "./modules";

export const store = createStore({
  plugins: [
    createPersistedState({
      paths: ["enums", "auth"],
      storage: {
        getItem: (key) => storage.get(key),
        setItem: (key, value) => storage.set(key, value),
        removeItem: (key) => storage.remove(key),
      },
    }),
  ],
  modules,
});
