import axios from "axios";
import { useAuth } from "element-plus-admin/composables/use-auth";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

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

  return request;
};

const formatQuery = (obj) => {
  const ret = {};

  Object.keys(obj).forEach((attribute) => {
    ret[attribute] = {};

    Object.keys(obj[attribute]).forEach((operator) => {
      if (
        obj[attribute][operator] === undefined ||
        obj[attribute][operator] === ""
      ) {
        delete ret[attribute];
      } else if (operator === "$like") {
        ret[attribute][operator] = `%${obj[attribute][operator]}%`;
      } else {
        ret[attribute] = obj[attribute];
      }
    });
  });

  return JSON.stringify(ret);
};

const dealWithRequest = ({ request, showLoading, showError }) => {
  return request
    .then(({ data }) => data)
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log("finished");
    });
};

export const createApi = ({ baseUrl, url, requiresAuth }) => {
  const headers = requiresAuth ? useAuth().getRequestHeaders() : null;
  const request = createRequest({ baseUrl, headers });

  return {
    get: async ({
      extraUrl = "",
      action,
      query,
      showLoading = true,
      showError = true,
    }) => {
      dealWithRequest({
        request: request.get(
          action ? `${url}/actions/${action}${extraUrl}` : url + extraUrl,
          { params: query }
        ),
        showLoading,
        showError,
      });
    },

    post: async ({
      extraUrl = "",
      action,
      body,
      query,
      showLoading,
      showError,
    }) => {
      return dealWithRequest({
        request: request.post(
          action ? `${url}/actions/${action}${extraUrl}` : url + extraUrl,
          body,
          { params: query }
        ),
        showLoading,
        showError,
      });
    },
  };
};
