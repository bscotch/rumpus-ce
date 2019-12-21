const path = require('path');

module.exports = {
  entry: './browser/index.ts',
  devtool: 'inline-source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use:{
          loader: 'ts-loader',
          options:{
            configFile: "browser/tsconfig.json"
          }
        }
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname,'browser'),
  },
};