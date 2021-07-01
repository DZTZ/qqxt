let cdn = {
  css: [],
  js: ["https://cdn.jsdelivr.net/npm/vue@2.5.21/dist/vue.min.js"]
};
module.exports = {
  publicPath: "./",
  runtimeCompiler: true,
  productionSourceMap: false,
  lintOnSave: false,
  outputDir: "docs",
  configureWebpack: {
    externals: {
      vue: "Vue"
    },
    plugins: [
      // new CompressionPlugin({
      //   test: /\.(js|css)?$/i, // 哪些文件要压缩
      //   filename: "[path].gz[query]", // 压缩后的文件名
      //   algorithm: "gzip", // 使用gzip压缩
      //   minRatio: 1, // 压缩率小于1才会压缩
      //   deleteOriginalAssets: true // 删除未压缩的文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false
      // })
    ]
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].cdn = cdn;
      return args;
    });
  }
  // assetsDir: 'static',
  // devServer: {
  //   proxy: {
  //     "/?s=": {
  //       target: "http://hd215.api.yesapi.cn", // 测试
  //       ws: false,
  //       changeOrigin: true,
  //       // pathRewrite: {
  //       //   "^/?s=": "/123"
  //       // }
  //     }
  //   }
  // }
};
