const dotenv = require('dotenv');
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: ['regenerator-runtime/runtime', './app/main.js'], // assumes your entry point is the index.js in the root of your project folder
  mode: isDev ? 'development' : 'production',
  output: {
    path: __dirname, // assumes your bundle.js will also be in the root of your project folder
    filename: './public/bundle.js',
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
      },
      // {
      //   test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      //   loader: 'url-loader?limit=100000',
      // },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
