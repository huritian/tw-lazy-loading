module.exports = {
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