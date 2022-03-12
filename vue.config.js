// 修改 webpack 的默认配置
// vue-cli 内部的 webpack 是通过 webpack-chain 维护的
// 这个库提供了 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则和具名插件

// 路径处理函数
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  // webpack 的 devServer 提供了代理的功能
  // 可以把所有请求到当前服务的请求，转发到另外一个服务器上
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true
      }
    }
  },
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
  }
}
