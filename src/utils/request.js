import axios from "axios";

const createRequest = ({ baseUrl, timeout = 5000, headers }) => {
  const request = axios.create({
    baseURL: baseUrl || process.env.VUE_APP_API_URL,
    timeout,
  });

  request.interceptors.request.use(
    (config) => {
      if (headers) {
        config.headers = headers;
      }

      console.log(config, "--");

      return config;
    },
    (error) => Promise.reject(error)
  );

  request.interceptors.response.use(
    (response) => {
      const res = response.data;

      if (res.code !== 20000) {
        console.log("error");
      }
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // re login
        return Promise.reject(new Error(res.message || "Error"));
      } else {
        return res;
      }
    },
    (error) => {
      console.log("err" + error);
      return Promise.reject(error);
    }
  );

  return service;
};

export const createApi = ({ baseUrl, requiresAuth }) => {
const headers = requiresAuth? {'Auth':}
  const request = createRequest({ baseUrl });

  return {
    post({ path, action }) {
      return request.post(action ? `${path}/actions/${action}` : path, {
        baseUrl,
        requiresAuth,
        ...restOptions,
      });
    },
  };
};
