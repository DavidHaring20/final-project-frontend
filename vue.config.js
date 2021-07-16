
const url = require('url');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let plugins = []
// plugins.push(new BundleAnalyzerPlugin())

module.exports = {
  publicPath: process.env.BASE_URL ? url.parse(process.env.BASE_URL).pathname : '/',
  devServer: {
    public: process.env.BASE_URL ? process.env.BASE_URL : '',
    sockPath: (process.env.BASE_URL ? url.parse(process.env.BASE_URL).pathname : '') + '/sockjs-node',
    disableHostCheck: true,
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('define').tap(function (definitions) {
      definitions[0]['process.env']['API_URL'] = JSON.stringify(process.env.API_URL);
      return definitions;
    });
    config.plugin('html').tap(args => {
      args[0]['title'] = process.env.APP_NAME || 'PocketMenu';
      return args;
    });
  },
  configureWebpack: {
    plugins
  }
};
