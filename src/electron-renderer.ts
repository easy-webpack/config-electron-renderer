import {WebpackConfig} from '../webpack'
import {literalReplace} from '../'
import {get} from 'lodash'
import * as webpack from 'webpack'

/**
 * @param externals list packages that should be used as node modules, directly from node_modules (without bundling)
 */
export function electronMain() {
  return function electronMain(this: WebpackConfig): WebpackConfig {
    return {
      target: 'electron-renderer',

      entry: this.metadata.HMR ? [
        `webpack-hot-middleware/client?path=http://${this.metadata.WEBPACK_HOST}:${this.metadata.WEBPACK_PORT}/__webpack_hmr&reload=true`
      ].concat(this.entry as Array<string>) : this.entry,

      output: {
        publicPath: 'http://localhost:3000/dist/'
      },

      plugins: (this.metadata.HMR ? [new webpack.HotModuleReplacementPlugin()] : [])
        .concat(get(this, 'plugins', [])),

      node: {
        __dirname: false,
        __filename: false
      },

      externals: [
        'source-map-support',
        'font-awesome'
      ].concat(get(this, 'externals', []))
    }
  }
}