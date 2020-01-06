'use strict';
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const path = require(`path`);
const publicPath = path.join(__dirname, `public`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: publicPath
  },
  devtool: `source-map`,
  devServer: {
    contentBase: publicPath,
    watchContentBase: true,
    compress: true,
  }
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    })
  ]
};
