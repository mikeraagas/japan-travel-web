const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@layout': path.resolve(__dirname, 'src/layout'),
        '@router': path.resolve(__dirname, 'src/router'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets'),
      }
    }
  }
}