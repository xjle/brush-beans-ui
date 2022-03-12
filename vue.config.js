const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

// 复制文件到指定目录
const copyFiles = [
  {
    from: path.resolve('src/plugins/manifest.json'),
    to: `${path.resolve('brush-beans-ui')}/manifest.json`
  },
  {
    from: path.resolve('src/assets'),
    to: path.resolve('brush-beans-ui/assets')
  },
  {
    from: path.resolve('src/plugins/inject.js'),
    to: path.resolve('brush-beans-ui/js')
    // to: path.resolve('dist/js')
  }
]

// 复制插件
const plugins = [
  new CopyWebpackPlugin({
    patterns: copyFiles
  })
]

// 页面文件
const pages = {}
// 配置 popup.html 页面
const chromeName = ['popup']

chromeName.forEach(name => {
  pages[name] = {
    entry: `src/${name}/main.js`,
    template: `src/${name}/index.html`,
    filename: `${name}.html`
  }
})

module.exports = {
  // devServer: {
  //   open: true,
  //   hot: true,
  //   compress: true,
  //   disableHostCheck: true,
  //   port: 8080,
  //   proxy: {
  //     '/admin': {
  //       target: process.env.VUE_APP_BASEURL,
  //       changeOrigin: true,
  //       cookieDomainRewrite: 'localhost'
  //     }
  //   }
  // },
  outputDir: 'brush-beans-ui',
  pages,
  productionSourceMap: false,
  // 配置 content.js background.js
  configureWebpack: {
    entry: {
      content: './src/content/main.js',
      background: './src/background/main.js'
    },
    output: {
      filename: 'js/[name].js'
    },
    plugins
  },
  // 配置 content.css
  css: {
    extract: {
      filename: 'css/[name].css'
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename('js/[name].js').end()
      config.output.chunkFilename('js/[name].js').end()
    }
  }
}
