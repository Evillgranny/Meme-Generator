const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')

const baseConfig = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}

module.exports = (env, argv) => {
  if (argv.mode === 'development')
    return merge(baseConfig, {
      devServer: {
        port: 9000,
        contentBase: path.join(__dirname, '/assets'),
        contentBasePublicPath: '/assets',
      },
      devtool: 'source-map',
    })

  if (argv.mode === 'production')
    return merge(baseConfig, {
      plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
          patterns: [
            {
              from: path.join(__dirname, '/assets'),
              to: path.join(__dirname, 'dist/assets'),
            },
          ],
        }),
      ],
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    })

  return baseConfig
}
