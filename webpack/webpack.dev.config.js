var path = require('path')
var globby = require('globby')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var PATH = {
  src: path.join(__dirname, '../src'),
  dst: path.join(__dirname, '../static/webpack'),
  server_dst: path.join(__dirname, '../static/webpack/server'),
  js: {
    pattern: ['./src/**/[^_]*.js', '!./src/common/**/*.js']
  },
  css: {
    pattern: ['./src/**/[^_]*.less', '!./src/common/**/_*.less']
  }
}

function getEntries(type) {
  var fileList = globby.sync(PATH[type].pattern)
  return fileList.reduce(function (list, file) {
    var filePath = path.parse(path.relative(PATH.src, file))
    var fileName = path.join(filePath.dir, filePath.name)
    list[fileName] = path.resolve(PATH.src, '../', file)
    return list
  }, {})
}

const serverConfig = {
  target: 'node',
  entry: getEntries('js'),
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
        use: ['css-loader']
      },
      {
        test: /\.less$/,
        use: ['css-loader', 'less-loader']
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
  ]
}


module.exports = [
  {
    devtool: 'cheap-module-eval-source-map',
    context: path.resolve(__dirname),
    entry: getEntries('css'),
    output: {
      path: PATH.dst,
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader', 'postcss-loader', 'less-loader']
          })
        }
      ]
    },
    resolve: {
      extensions: ['.less']
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  },
  {
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
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
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
  },
  serverConfig
]
