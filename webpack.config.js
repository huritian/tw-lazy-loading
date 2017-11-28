var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const config = {
  entry: __dirname + '/src/blurry.js',
  output: {
    path: __dirname + "/dist",
    filename: 'index.js'
  },    
  module: {    
    rules: [{    
        test: /\.js$/,    
        exclude: /node_modules/,    
        use: {
          loader: "babel-loader"
        }
    }]    
  }
}

if (process.env.NODE_ENV !== 'production') {
  console.log(process.env.NODE_ENV)
  Object.assign(config, {
    entry: __dirname + '/example/main.js',
    output: {
      path: __dirname + "/example/",
      filename: 'build.js'
    },
    devServer:{
      contentBase: "./", 
      historyApiFallback:true,
      inline:true,
      hot:true,
      port: '8091'
    },
    watch: true,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': 'development'
      })
    ]
  })
} else {
  Object.assign(config, {
    entry: __dirname + '/src/blurry.js',
    output: {
      path: __dirname + "/dist",
      filename: 'index.js',
      libraryTarget: 'umd',
      library: 'LazyLoad'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': 'production'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  })
}

module.exports = config