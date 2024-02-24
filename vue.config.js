module.exports = {
  // publicPath: "/fjqshadmin/",
  transpileDependencies: ["element-plus-admin"],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
  },
};
