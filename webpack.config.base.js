//entry: str, it's a relative path to our entry file
//output: obj, it contains settings for output
//output.path is an absolute path where we want to output files
//mode defines production or development bundling
//we use loaders to do something on source files before they get bundled
//it's in modules key we use loaders
//we use babel-loader to rn babel on js files before output
//plugins needs to be required in config
//we use HTML plugin to generate html files

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        //because we need to pass an array loaders is deprecated now its use
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
