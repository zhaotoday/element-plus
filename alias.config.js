// File -> Settings -> Languages & Frameworks -> JavaScript -> Webpack
// -> webpack configuration file 选择 alias.config.js

const resolve = (dir) => require("path").join(__dirname, dir);

module.exports = {
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
};
