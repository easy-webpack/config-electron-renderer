import {WebpackConfig, get} from '@easy-webpack/core'
import * as path from 'path'

/**
 * Babel loader support for ES2015
 * See: https://github.com/babel/babel-loader
 */
export function babel(options = {
    plugins: ['transform-decorators-legacy'],
    presets: ['es2015-loose-native-modules', 'stage-1'],
    cacheDirectory: true,
  }, exclude: Array<string> = null) {
  return function babel(this: WebpackConfig): WebpackConfig {
    return {
      module: {
        loaders: get(this, 'module.loaders', []).concat([{
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: exclude || this.metadata.root ? [path.join(this.metadata.root, 'node_modules')] : [],
          query: options
        }])
      }
    }
  }
}