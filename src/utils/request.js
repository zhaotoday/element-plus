import axios from "axios";

const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // config.headers["X-Token"] = {};

    console.log(config, "--");
    return config;
  },
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
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

export default service;
