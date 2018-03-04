var path = require('path')
var globby = require('globby')
var webpack = require('webpack')

var PATH = {
  src: path.join(__dirname, '../src'),
  dst: path.join(__dirname, '../dist'),
  js: {
    pattern: ['./src/**/*.js', '!./src/common/**/*.js']
  },
  css: {
    pattern: ['./src/**/*.less']
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
          use: ['css-loader', 'postcss-loader', 'less-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.less']
    }
  },
  {
    devtool: 'cheap-module-eval-source-map',
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
          NODE_ENV: 'production'
        }
      })
    ],
    // externals: {
    //   react: 'var React',
    //   'react-dom': 'var ReactDom'
    // }
  }
]
