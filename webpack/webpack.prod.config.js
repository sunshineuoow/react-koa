var path = require('path')
var globby = require('globby')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var PATH = {
  src: path.join(__dirname, '../src'),
  dst: path.join(__dirname, '../static/webpack'),
  server_dst: path.join(__dirname, '../static/webpack/server'),
  js: {
    pattern: ['./src/**/[^_]*.js', '!./src/common/**/*.js', '!./src/**/container/*.js']
  },
  server_js: {
    pattern: ['./src/**/container/*.js']
  }
}

function getEntries(type) {
  var fileList = globby.sync(PATH[type].pattern)
  return fileList.reduce(function (list, file) {
    var filePath = path.parse(path.relative(PATH.src, file))
    var fileName = path.join(filePath.dir, filePath.name)
    if (type === 'server_js') fileName = fileName.replace(/h5\/|\/container/g, '')
    list[fileName] = path.resolve(PATH.src, '../', file)
    return list
  }, {})
}


const serverConfig = {
  target: 'node',
  entry: getEntries('server_js'),
  output: {
    path: PATH.server_dst,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf|png|jpg|jpeg|gif)(\?v=[\d\.]+)?$/,
        use: 'file-loader?name=/build/files/[name].[ext]',
        exclude: /node_modules\/antd/
      }
    ]
  },
  resolve: {
    modules: [
      PATH.src,
      'node_modules'
    ],
    extensions: ['.web.js', '.js', '.json', '.less']
  },
  plugins: [
    new ExtractTextPlugin('[name]-[chunkhash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
}

const clientConfig = {
  context: path.resolve(__dirname),
  entry: getEntries('js'),
  output: {
    path: PATH.dst,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        use: ['css-loader']
      },
      {
        test: /\.less$/,
        use: ['css-loader', 'less-loader']
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf|png|jpg|jpeg|gif)(\?v=[\d\.]+)?$/,
        use: 'file-loader?name=/build/files/[name].[ext]',
        exclude: /node_modules\/antd/
      }
    ]
  },
  resolve: {
    modules: [
      PATH.src,
      'node_modules'
    ],
    extensions: ['.web.js', '.js', '.json', '.less']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ],
  // externals: {
  //   react: 'var React',
  //   'react-dom': 'var ReactDom'
  // }
}


module.exports = [
  clientConfig,
  serverConfig
]