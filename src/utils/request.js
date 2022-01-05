import axios from "axios";
import { useAuth } from "element-plus-admin/composables/use-auth";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ElMessage } from "element-plus";

const createRequest = ({ baseUrl, timeout = 5000, headers }) => {
  const request = axios.create({
    baseURL: baseUrl || process.env.VUE_APP_API_URL,
    timeout,
  });

  request.interceptors.request.use(
    (config) => {
      const { method, params, showLoading } = config;

      showLoading && NProgress.start();

      if (headers) {
        config.headers = headers;
      }

      if (params.where) {
        config.params.where = formatQuery(params.where);
      }

      ["include", "order", "attributes"].forEach((key) => {
        if (params[key]) {
          config.params[key] = JSON.stringify(params[key]);
        }
      });

      if (method === "get") {
        config.params._ = new Date().getTime();
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  request.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const {
        response: { config, status, data },
      } = error;

      config.showLoading && NProgress.done();

      if (status === 401) {
        window.location.href = "/#/logout";
      } else {
        config.showError && ElMessage.error(data.error || "服务器内部错误");
      }

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

export const createApi = ({ baseUrl, url, requiresAuth }) => {
  const headers = requiresAuth ? useAuth().getRequestHeaders() : null;
  const request = createRequest({ baseUrl, headers });

  return {
    get: ({ query, showLoading = true, showError = true }) =>
      request.get(url, { params: query, showLoading, showError }),

    post: ({ action, body, query, showLoading = true, showError = true }) =>
      request.post(action ? `${url}/actions/${action}` : url, body, {
        params: query,
        showLoading,
        showError,
      }),

    put: ({ id, body, query, showLoading = true, showError = true }) =>
      request.post(`${url}/${id}`, body, {
        params: query,
        showLoading,
        showError,
      }),

    delete: ({ id }) => request.delete(`${url}/${id}`),
  };
};
