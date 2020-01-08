const merge = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')
const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  parallel: false,
  outputDir: './dist',
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config
      .plugin('ignore')
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://ldsxapi.dameicm.cn',
        target: 'http://192.168.0.106:9001',
        // target: 'http://192.168.0.85:8089',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}
