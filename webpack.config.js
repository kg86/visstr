const path = require('path')

const configDemo = {
  mode: 'development',
  // devtool: 'source-map',
  // devtool: 'cheap-eval-source-map',
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'inline-source-map',
  entry: {
    vis_str_demo: './src/vis_str_demo.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
}
const configLibrary = {
  mode: 'development',
  // devtool: 'source-map',
  // devtool: 'cheap-eval-source-map',
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'inline-source-map',
  entry: {
    vis_str: './src/vis_str.ts',
  },
  output: {
    filename: '[name].umd.js',
    path: path.resolve(__dirname, 'lib'),
    library: 'visstr',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    modules: ['node_modules', 'color-convert', path.resolve(__dirname, 'src')],
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
}

module.exports = [configDemo, configLibrary]
// module.exports = [configLibrary]
