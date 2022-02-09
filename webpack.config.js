const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const mode = process.env.NODE_ENV || 'production'
const isDevMode = mode === 'development'

module.exports = {
  mode,

  entry: {
    main: resolve(__dirname, 'src/main.js')
  },

  output: {
    path: resolve(__dirname, 'public'),
    filename: isDevMode ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
    assetModuleFilename: '[name].[contenthash][ext]',
    clean: true
  },

  devServer: {
    static: resolve(__dirname, 'public'),
    port: 5055,
    open: true
    // compress: true
  },

  devtool: isDevMode ? 'eval-source-map' : 'source-map',

  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 1500
  },

  // performance: {
  //   hints: false
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/i,
        exclude: [resolve(__dirname, 'src/assets/ico')],
        type: 'asset/resource'
      },
      {
        test: /\.svg$/i,
        type: 'asset/inline'
      },
      {
        test: /\.txt$/i,
        type: 'asset/source'
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)$/,
        include: [resolve(__dirname, 'src/assets/fonts')],
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack 5 tutorial',
      lang: 'hu',
      template: resolve(__dirname, 'src/assets/template/index.html')
    }),
    new ESLintPlugin(),
    new StylelintPlugin({
      files: resolve(__dirname, 'src/assets/**/*.css')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/assets/user/**/*',
          to: resolve(__dirname, 'public/[name][ext]')
        }
      ]
    }),
    ...addProdPlugins([
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      })
    ])
  ]
}

function addProdPlugins (plugins) {
  return !isDevMode && plugins ? plugins : []
}
