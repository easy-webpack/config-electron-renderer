import {WebpackConfig, get} from '@easy-webpack/core'
import * as path from 'path'
const webpack = require('webpack')

/**
 * @param externals list packages that should be used as node modules, directly from node_modules (without bundling)
 */
export = function electronRenderer() {
  return function electronRenderer(this: WebpackConfig): WebpackConfig {
    const config = <WebpackConfig> {
      metadata: {
        ELECTRON: 'renderer'
      },

      target: 'electron-renderer',

      entry: this.metadata.HMR ? [
        `webpack-hot-middleware/client?path=http://${this.metadata.host}:${this.metadata.port}/__webpack_hmr&reload=true`
      ].concat(this.entry as Array<string>) : this.entry,

      plugins: (this.metadata.HMR ? [new webpack.HotModuleReplacementPlugin()] : [])
        .concat(get(this, 'plugins', [])),

      node: {
        __dirname: false,
        __filename: false
      }
    }

    if (this.metadata.HMR) {
      config.output = {
        publicPath: `http://${this.metadata.host}:${this.metadata.port}/`
      }
    }

    if (this.metadata.root) {
      config.devServer = {
        contentBase: path.join(this.metadata.root, 'app')
      }
    }

    return config
  }
}