import helpers from "@/utils/helpers";

const files = require.context(".", false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  if (key === "./index.js") return;

  const item = files(key).default;
  const name = helpers.toLowerCamelCase(key.substr(2, key.length - 5));

  modules[`public/${name}`] = item;
});

export default modules;
