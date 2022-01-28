const CracoLessPlugin = require('craco-less')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
// var path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  plugins: [
    {
      plugin: [
        CracoLessPlugin,
        // new HtmlWebpackPlugin({
        //   title: 'React',
        //   // filename: 'index.html',
        //   template: path.resolve(__dirname, './public/index.html'),
        //   files: {
        //     // 配置 CDN 引入
        //     js: [
        //       'https://unpkg.com/react@17.0.1/umd/react.production.min.js',
        //       'https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js',
        //       'https://unpkg.com/react-redux@7.2.2/dist/react-redux.min.js',
        //       'https://cdn.bootcdn.net/ajax/libs/react-router-dom/5.2.0/react-router-dom.min.js',
        //       'https://unpkg.com/antd@4.14.0/dist/antd.min.js',
        //       'https://unpkg.com/redux@4.0.5/dist/redux.min.js',
        //       'https://unpkg.com/redux-thunk@2.3.0/dist/redux-thunk.min.js',
        //     ],
        //     css: ['https://unpkg.com/antd@4.14.0/dist/antd.min.css'],
        //   },
        // }),
      ],
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
    plugins: [
      //打包分析
      new BundleAnalyzerPlugin(),
      // 打压缩包
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 1024,
        minRatio: 0.8,
      }),
      new SimpleProgressWebpackPlugin(),
    ],
    //抽离公用模块
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
  },
}
