import { Base64 } from "js-base64";

export const useHelpers = () => {
  const formatFilters = (filters) => {
    delete filters.isTrusted;

    const ret = {};

    Object.keys(filters).forEach((key) => {
      if (
        typeof filters[key] === "string" ||
        typeof filters[key] === "number"
      ) {
        ret[key] = { $eq: filters[key] };
      } else {
        ret[key] = filters[key];
      }
    });

    return ret;
  };

  const encode = (object) => Base64.encode(JSON.stringify(object));

  const decode = (string) =>
    string ? JSON.parse(Base64.decode(string.toString())) : {};

  return { formatFilters, encode, decode };
};
