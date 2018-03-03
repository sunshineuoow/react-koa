module.exports = {
  plugins: {
    autoprefixer: {
      remove: false,
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
    },
    /**
     * 这里只对Antd-mobile的样式进行自动px转rem
     */
    "postcss-pxtorem": {
      rootValue: 10,
      propWhiteList: []
    }
  }
}
