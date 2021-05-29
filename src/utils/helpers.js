import $helpers from "jt-helpers";

export const helpers = {
  ...$helpers,
  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj || {}));
  },
  formatNumber(number) {
    return parseFloat(number.toFixed(2));
  },
  toLowerCamelCase(str) {
    return str.replace(/-([a-z])/g, (all, letter) => letter.toUpperCase());
  },
};
