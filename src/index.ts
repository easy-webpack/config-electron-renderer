import {WebpackConfig, get} from '@easy-webpack/core'
const webpack = require('webpack')

/**
 * @param externals list packages that should be used as node modules, directly from node_modules (without bundling)
 */
export = function electronRenderer() {
  return function electronRenderer(this: WebpackConfig): WebpackConfig {
    return {
      metadata: {
        ELECTRON: 'renderer'
      },

      target: 'electron-renderer',

      entry: this.metadata.HMR ? [
        `webpack-hot-middleware/client?path=http://${this.metadata.host}:${this.metadata.port}/__webpack_hmr&reload=true`
      ].concat(this.entry as Array<string>) : this.entry,

      output: {
        publicPath: `http://${this.metadata.host}:${this.metadata.port}/`
      },

      plugins: (this.metadata.HMR ? [new webpack.HotModuleReplacementPlugin()] : [])
        .concat(get(this, 'plugins', [])),

      node: {
        __dirname: false,
        __filename: false
      }
    }
  }
}