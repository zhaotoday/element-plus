import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ElMessage } from "element-plus";
import { debounce } from "throttle-debounce";

NProgress.configure({ showSpinner: false });

const startProgress = debounce(100, NProgress.start, { atBegin: true });

const doneProgress = debounce(100, NProgress.done, { atBegin: false });

const createRequest = ({ baseUrl, timeout = 5000, query, body }) => {
  const request = axios.create({
    baseURL: baseUrl || process.env.VUE_APP_API_URL,
    timeout,
  });

  request.interceptors.request.use(
    (config) => {
      const { method, params, data, showLoading } = config;

      showLoading && startProgress();

      if (params) {
        if (params.where) {
          config.params.where = formatQuery({
            ...params.where,
            ...(query.where || {}),
          });
        } else {
          config.params.where = formatQuery(query.where || {});
        }
      }

      if (data) {
        Object.assign(config.data, body);
      }

      ["include", "order", "attributes"].forEach((key) => {
        if (params && params[key]) {
          config.params[key] = JSON.stringify(params[key]);
        }
      });

      if (method === "get") {
        if (params) {
          config.params._ = new Date().getTime();
        } else {
          config.params = { _: new Date().getTime() };
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  request.interceptors.response.use(
    (response) => {
      const {
        config,
        data: { data },
      } = response;

      config.showLoading && doneProgress();

      return data;
    },
    (error) => {
      const {
        response: { config, status, data },
      } = error;

      config.showLoading && doneProgress();

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

export const createApi = ({
  baseUrl,
  getHeaders = () => null,
  url,
  query = {},
  body = {},
}) => {
  const request = createRequest({ baseUrl, query, body });

  return {
    config: { baseUrl, url, query, body },

    get: ({ joinUrl = "", id, query, showLoading = true, showError = true }) =>
      request.get(`${url}${joinUrl}${id ? `/${id}` : ""}`, {
        headers: getHeaders(),
        params: query,
        showLoading,
        showError,
      }),

    post: ({
      joinUrl = "",
      action,
      body,
      query,
      showLoading = true,
      showError = true,
    }) =>
      request.post(
        action ? `${url}${joinUrl}/actions/${action}` : url + joinUrl,
        body,
        {
          headers: getHeaders(),
          params: query,
          showLoading,
          showError,
        }
      ),

    put: ({
      joinUrl = "",
      id,
      body,
      query,
      showLoading = true,
      showError = true,
    }) =>
      request.put(`${url}${joinUrl}/${id}`, body, {
        headers: getHeaders(),
        params: query,
        showLoading,
        showError,
      }),

    delete: ({
      joinUrl = "",
      id,
      query,
      showLoading = true,
      showError = true,
    }) =>
      request.delete(`${url}${joinUrl}/${id}`, {
        headers: getHeaders(),
        params: query,
        showLoading,
        showError,
      }),
  };
};
