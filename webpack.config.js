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
      hot:true
    },
    watch: true,
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: __dirname + '/example/richText.html',
        template: __dirname + '/example/richText.html',
        inject: true
      }),
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
      filename: 'index.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': 'production'
      })
    ]
  })
}

module.exports = config