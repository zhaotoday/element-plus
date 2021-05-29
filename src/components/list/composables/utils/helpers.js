import { Base64 } from "js-base64";

const formatFilters = filters => {
  delete filters.isTrusted;

  const ret = [];

  Object.keys(filters).forEach(key => {
    filters[key] !== "" && ret.push([key, "eq", filters[key]]);
  });

  return ret.length ? JSON.stringify(ret) : "";
};

const formatOrders = sort => {
  return sort;
};

const encode = object => Base64.encode(JSON.stringify(object));

const decode = string =>
  string ? JSON.parse(Base64.decode(string.toString())) : {};

export const $helpers = { formatFilters, formatOrders, encode, decode };
