const CracoLessPlugin = require('craco-less')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
console.log(isProd, process.env.NODE_ENV)
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1890ff' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configureWebpack: (webpackConfig) => {
      if (isProd) {
        webpackConfig.plugin.push(
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
            threshold: 1024,
            minRatio: 0.8,
          })
        )
        webpackConfig.plugin.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true,
              },
            },
            sourceMap: false,
            parallel: true,
          })
        )
        webpackConfig.plugin.push(new SimpleProgressWebpackPlugin())
      }
    },
  },
}
