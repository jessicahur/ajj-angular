const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const DefinePlugin = require('webpack').DefinePlugin;
const path = require( 'path' );
const entry = './src/entry.js';

module.exports = {
  entry,
  output: {
    path: path.resolve( __dirname, '../server/public' ),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new DefinePlugin({
      BASE_URL: JSON.stringify(process.env.BASE_URL || '')
      // CLIENT_ID: JSON.stringify(process.env.CLIENT_ID || '')
    })
  ],
  module: {
    preLoaders: [
      {
          test: /\.js$/, // include .js files
          exclude: /node_modules/, // exclude any and all files in the node_modules folder
          loader: "jshint-loader"
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
          query: {
            presets: ['es2015'] //,
            // cacheDirectory: true,
            // plugins: ['transform-runtime']
          }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.html$/,
        loader: 'html'
      }
    ]
  }
};
