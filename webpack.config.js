const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = { 
  entry: './src/index.js', 
  mode: 'development',
  devServer: {
    contentBase: './dist'
  },
  output: { 
    path: path.resolve(__dirname,'dist'), 
    filename: 'index_bundle.js'
  }, 
  module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        },
        {
          test: /\.(scss)$/,
          use: [{
            loader: 'style-loader', // inject CSS to page
          }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }]
        },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: 'src/index.html',
    }),
    new webpack.ProvidePlugin({
      Crafty: 'craftyjs/dist/crafty-min', // Crafty doesn't like to be built directly so we use provide instead
      // Recipe from https://github.com/ojread/craftyjs-webpack
    }),
  ],
  devServer: {
      contentBase: './dist',
  },
}
